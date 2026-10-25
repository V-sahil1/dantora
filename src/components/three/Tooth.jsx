import * as THREE from 'three'

/*
 * A procedurally sculpted lower first molar.
 *
 * The shape is a signed distance field (crown + four cusps + occlusal
 * fissures + cervical neck + two curved, flattened roots, all blended with
 * smooth unions) that is meshed once with "naive surface nets" and cached.
 * Normals come from the SDF gradient so shading stays smooth, and vertex
 * colours separate glossy enamel from the warmer cementum of the roots.
 */

// ---------- SDF helpers ----------
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const smin = (a, b, k) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * k * 0.25
}
const smax = (a, b, k) => -smin(-a, -b, k)

function sdEllipsoid(x, y, z, rx, ry, rz) {
  const k0 = Math.hypot(x / rx, y / ry, z / rz)
  const k1 = Math.hypot(x / (rx * rx), y / (ry * ry), z / (rz * rz))
  return (k0 * (k0 - 1)) / k1
}

function sdRoundBox(x, y, z, bx, by, bz, r) {
  const qx = Math.abs(x) - bx
  const qy = Math.abs(y) - by
  const qz = Math.abs(z) - bz
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qy, qz), 0) - r
}

/** Distance to a segment whose radius tapers from r1 (at a) to r2 (at b). */
function sdTaper(x, y, z, ax, ay, az, bx, by, bz, r1, r2) {
  const px = x - ax
  const py = y - ay
  const pz = z - az
  const ex = bx - ax
  const ey = by - ay
  const ez = bz - az
  const t = clamp((px * ex + py * ey + pz * ez) / (ex * ex + ey * ey + ez * ez), 0, 1)
  return Math.hypot(px - ex * t, py - ey * t, pz - ez * t) - (r1 + (r2 - r1) * t)
}

function sdSegment(x, y, z, ax, ay, az, bx, by, bz) {
  return sdTaper(x, y, z, ax, ay, az, bx, by, bz, 0, 0)
}

// Occlusal fissure pattern: a mesio-distal central groove plus a bucco-lingual one
function fissureDistance(x, y, z) {
  const wave = Math.sin(x * 9) * 0.025
  const central = sdSegment(x, y, z + wave, -0.5, 0.6, 0, 0.5, 0.6, 0)
  const cross = sdSegment(x + Math.sin(z * 8) * 0.02, y, z, 0.02, 0.6, -0.5, 0.02, 0.6, 0.5)
  return Math.min(central, cross)
}

const CEJ_Y = -0.33 // cemento-enamel junction (where enamel stops and root begins)

function toothSDF(x, y, z) {
  // --- Crown: rounded block that bulges at mid-height and narrows to the neck
  const taper = 1 + 0.3 * smoothstep(0.05, -0.55, y) - 0.05 * smoothstep(-0.2, 0.2, y)
  let d = sdRoundBox(x * taper, y - 0.05, z * taper, 0.48, 0.27, 0.4, 0.32)

  // --- Cusps (mesio-buccal, disto-buccal, mesio-lingual, disto-lingual + small distal)
  d = smin(d, sdEllipsoid(x + 0.36, y - 0.4, z - 0.3, 0.37, 0.27, 0.34), 0.2)
  d = smin(d, sdEllipsoid(x - 0.34, y - 0.38, z - 0.31, 0.35, 0.25, 0.33), 0.2)
  d = smin(d, sdEllipsoid(x + 0.36, y - 0.43, z + 0.3, 0.36, 0.29, 0.33), 0.2)
  d = smin(d, sdEllipsoid(x - 0.34, y - 0.41, z + 0.3, 0.35, 0.28, 0.33), 0.2)
  d = smin(d, sdEllipsoid(x - 0.62, y - 0.3, z - 0.05, 0.2, 0.18, 0.22), 0.16)

  // --- Carve the fissures into the occlusal table
  d = smax(d, -(fissureDistance(x, y, z) - 0.04), 0.08)

  // --- Roots: mesial + distal, flattened mesio-distally, curving distally at the apex
  const bend = 0.16 * smoothstep(-0.7, -1.75, y) ** 2
  const rx = x - bend
  const rz = z * 0.78 // broader bucco-lingually than mesio-distally
  const mesial = sdTaper(rx, y, rz, -0.32, -0.2, 0, -0.42, -1.7, 0, 0.36, 0.07)
  const distal = sdTaper(rx, y, rz, 0.3, -0.2, 0, 0.36, -1.55, 0, 0.33, 0.07)
  const trunk = sdEllipsoid(x, y + 0.42, z, 0.62, 0.3, 0.5)
  const roots = smin(smin(mesial, distal, 0.14), trunk, 0.22)
  d = smin(d, roots, 0.18)

  // --- Subtle constriction ring at the cemento-enamel junction
  d += 0.018 * Math.exp(-(((y - CEJ_Y) / 0.06) ** 2))

  // --- Fine organic surface variation
  d += 0.004 * Math.sin(x * 13 + 3) * Math.sin(y * 11) * Math.sin(z * 12 + 1)
  return d
}

// ---------- Naive surface nets ----------
const CORNERS = [
  [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0],
  [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1],
]
const CELL_EDGES = [
  [0, 1], [2, 3], [4, 5], [6, 7],
  [0, 2], [1, 3], [4, 6], [5, 7],
  [0, 4], [1, 5], [2, 6], [3, 7],
]

function gradient(x, y, z) {
  const e = 0.002
  const nx = toothSDF(x + e, y, z) - toothSDF(x - e, y, z)
  const ny = toothSDF(x, y + e, z) - toothSDF(x, y - e, z)
  const nz = toothSDF(x, y, z + e) - toothSDF(x, y, z - e)
  const len = Math.hypot(nx, ny, nz) || 1
  return [nx / len, ny / len, nz / len]
}

const ENAMEL = new THREE.Color('#f8f6f0')
const ENAMEL_EDGE = new THREE.Color('#eef1ef') // slightly translucent blue-white at cusp tips
const FISSURE = new THREE.Color('#cfc3ab')
const CEMENTUM = new THREE.Color('#e6d6b8')
const APEX = new THREE.Color('#d9c29c')

function buildToothGeometry() {
  const h = 0.024
  const min = [-1.05, -1.95, -0.95]
  const max = [1.05, 0.95, 0.95]
  const nx = Math.ceil((max[0] - min[0]) / h) + 1
  const ny = Math.ceil((max[1] - min[1]) / h) + 1
  const nz = Math.ceil((max[2] - min[2]) / h) + 1
  const at = (i, j, k) => i + nx * (j + ny * k)

  const field = new Float32Array(nx * ny * nz)
  for (let k = 0; k < nz; k++)
    for (let j = 0; j < ny; j++)
      for (let i = 0; i < nx; i++) field[at(i, j, k)] = toothSDF(min[0] + i * h, min[1] + j * h, min[2] + k * h)

  // One vertex per cell that straddles the surface
  const cellVertex = new Int32Array((nx - 1) * (ny - 1) * (nz - 1)).fill(-1)
  const cellAt = (i, j, k) => i + (nx - 1) * (j + (ny - 1) * k)
  const positions = []
  const vals = new Float32Array(8)

  for (let k = 0; k < nz - 1; k++)
    for (let j = 0; j < ny - 1; j++)
      for (let i = 0; i < nx - 1; i++) {
        let mask = 0
        for (let c = 0; c < 8; c++) {
          const [ci, cj, ck] = CORNERS[c]
          vals[c] = field[at(i + ci, j + cj, k + ck)]
          if (vals[c] < 0) mask |= 1 << c
        }
        if (mask === 0 || mask === 255) continue

        let sx = 0
        let sy = 0
        let sz = 0
        let n = 0
        for (const [a, b] of CELL_EDGES) {
          const va = vals[a]
          const vb = vals[b]
          if (va < 0 === vb < 0) continue
          const t = va / (va - vb)
          sx += CORNERS[a][0] + (CORNERS[b][0] - CORNERS[a][0]) * t
          sy += CORNERS[a][1] + (CORNERS[b][1] - CORNERS[a][1]) * t
          sz += CORNERS[a][2] + (CORNERS[b][2] - CORNERS[a][2]) * t
          n++
        }
        let px = min[0] + (i + sx / n) * h
        let py = min[1] + (j + sy / n) * h
        let pz = min[2] + (k + sz / n) * h

        // Two Newton steps snap the vertex onto the true surface
        for (let s = 0; s < 2; s++) {
          const d = toothSDF(px, py, pz)
          const [gx, gy, gz] = gradient(px, py, pz)
          px -= gx * d
          py -= gy * d
          pz -= gz * d
        }

        cellVertex[cellAt(i, j, k)] = positions.length / 3
        positions.push(px, py, pz)
      }

  // One quad per grid edge that crosses the surface
  const indices = []
  const quad = (a, b, c, d, flip) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return
    if (flip) indices.push(a, d, c, a, c, b)
    else indices.push(a, b, c, a, c, d)
  }
  for (let k = 1; k < nz - 1; k++)
    for (let j = 1; j < ny - 1; j++)
      for (let i = 1; i < nx - 1; i++) {
        const v0 = field[at(i, j, k)]
        const inside = v0 < 0
        // edge along +x: neighbouring cells vary in (y, z)
        if (inside !== field[at(i + 1, j, k)] < 0)
          quad(cellVertex[cellAt(i, j - 1, k - 1)], cellVertex[cellAt(i, j, k - 1)], cellVertex[cellAt(i, j, k)], cellVertex[cellAt(i, j - 1, k)], !inside)
        // edge along +y: neighbouring cells vary in (z, x)
        if (inside !== field[at(i, j + 1, k)] < 0)
          quad(cellVertex[cellAt(i - 1, j, k - 1)], cellVertex[cellAt(i - 1, j, k)], cellVertex[cellAt(i, j, k)], cellVertex[cellAt(i, j, k - 1)], !inside)
        // edge along +z: neighbouring cells vary in (x, y)
        if (inside !== field[at(i, j, k + 1)] < 0)
          quad(cellVertex[cellAt(i - 1, j - 1, k)], cellVertex[cellAt(i, j - 1, k)], cellVertex[cellAt(i, j, k)], cellVertex[cellAt(i - 1, j, k)], !inside)
      }

  // Normals from the SDF gradient + enamel/cementum vertex colours
  const count = positions.length / 3
  const normals = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const col = new THREE.Color()
  for (let v = 0; v < count; v++) {
    const x = positions[v * 3]
    const y = positions[v * 3 + 1]
    const z = positions[v * 3 + 2]
    const [gx, gy, gz] = gradient(x, y, z)
    normals.set([gx, gy, gz], v * 3)

    col.copy(ENAMEL)
    col.lerp(ENAMEL_EDGE, smoothstep(0.55, 0.72, y) * 0.8)
    col.lerp(FISSURE, (1 - smoothstep(0.05, 0.16, fissureDistance(x, y, z))) * smoothstep(0.3, 0.5, y))
    const root = smoothstep(CEJ_Y + 0.04, CEJ_Y - 0.08, y)
    col.lerp(CEMENTUM, root)
    col.lerp(APEX, smoothstep(-1.0, -1.7, y))
    colors.set([col.r, col.g, col.b], v * 3)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setIndex(indices)
  geometry.computeBoundingSphere()
  return geometry
}

let cached = null
export function getToothGeometry() {
  if (!cached) cached = buildToothGeometry()
  return cached
}

/** Shared enamel-like material; scenes may tweak colour/roughness at runtime. */
export function createToothMaterial(overrides = {}) {
  return new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    color: '#ffffff',
    roughness: 0.22,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    sheen: 0.6,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color('#fff3df'),
    ior: 1.62,
    specularIntensity: 0.7,
    ...overrides,
  })
}

export default function Tooth({ material }) {
  return <mesh geometry={getToothGeometry()} material={material} position-y={0.45} />
}
