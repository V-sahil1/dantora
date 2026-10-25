import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import Tooth, { createToothMaterial } from './Tooth'

/** Soft radial glow texture used for the "healthy smile" halo. */
function makeGlowTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(132,242,236,0.8)')
  g.addColorStop(0.4, 'rgba(132,242,236,0.15)')
  g.addColorStop(1, 'rgba(132,242,236,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smoothstep = (a, b, x) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
// 0 → 1 → 0 window between a and b with soft edges
const bump = (p, a, b) => smoothstep(a, a + 0.08, p) * (1 - smoothstep(b - 0.08, b, p))

/**
 * The molar that narrates the four care stages as the user scrolls:
 * assessment (slow turn) → planning (scan rings) → treatment (polish) → maintenance (glow).
 */
function JourneyTooth({ progress }) {
  const group = useRef()
  const ring = useRef()
  const ring2 = useRef()
  const halo = useRef()

  const dull = useMemo(() => new THREE.Color('#d9d1c1'), [])
  const bright = useMemo(() => new THREE.Color('#ffffff'), [])
  const glowMap = useMemo(makeGlowTexture, [])
  const material = useMemo(
    () =>
      createToothMaterial({
        color: dull.clone(),
        roughness: 0.48,
        clearcoat: 0.3,
        emissive: new THREE.Color('#54C5C0'),
        emissiveIntensity: 0,
      }),
    [dull],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = progress.current

    group.current.rotation.y = p * Math.PI * 2.5 + t * 0.12
    group.current.rotation.x = 0.2 + Math.sin(t * 0.6) * 0.08
    group.current.position.y = Math.sin(t * 0.9) * 0.08
    group.current.scale.setScalar(0.74 + smoothstep(0, 0.2, p) * 0.1)

    const scan = bump(p, 0.18, 0.55)
    ring.current.material.opacity = scan
    ring.current.position.y = Math.sin(t * 2.4) * 0.95
    ring2.current.material.opacity = scan * 0.45
    ring2.current.position.y = Math.sin(t * 2.4 + 1.2) * 0.95

    const polish = smoothstep(0.5, 0.8, p)
    material.color.lerpColors(dull, bright, polish)
    material.roughness = 0.48 - polish * 0.36
    material.clearcoat = 0.3 + polish * 0.7

    const glow = smoothstep(0.78, 0.98, p)
    halo.current.material.opacity = glow * 0.7
    halo.current.scale.setScalar(0.6 + glow * 0.6)
    material.emissiveIntensity = glow * 0.06
  })

  return (
    <>
      <mesh ref={halo} position-z={-1.5}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial map={glowMap} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <group ref={group}>
        <Tooth material={material} />
      </group>
      <mesh ref={ring} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.45, 0.018, 12, 96]} />
        <meshBasicMaterial color="#54C5C0" transparent opacity={0} />
      </mesh>
      <mesh ref={ring2} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.25, 0.01, 12, 96]} />
        <meshBasicMaterial color="#84f2ec" transparent opacity={0} />
      </mesh>
    </>
  )
}

export default function JourneyScene({ progress }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.2], fov: 40 }} gl={{ alpha: true, antialias: true }} style={{ pointerEvents: 'none' }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, 3]} intensity={5} color="#54C5C0" />
      <Environment resolution={256}>
        <Lightformer intensity={2.5} position={[0, 5, -9]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.4} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 0.6, 1]} color="#84f2ec" />
        <Lightformer intensity={1.2} position={[5, 1, 0]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <JourneyTooth progress={progress} />
      <Sparkles count={50} scale={[8, 6, 4]} size={1.8} speed={0.3} opacity={0.5} color="#84f2ec" />
    </Canvas>
  )
}
