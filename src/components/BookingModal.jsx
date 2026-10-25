import { useEffect, useRef, useState } from 'react'
import { useBooking } from '../BookingContext'
import { gsap, useGSAP } from '../lib/gsap'
import { getLenis } from './SmoothScroll'

const today = () => new Date().toISOString().split('T')[0]

export default function BookingModal() {
  const { open, service, closeBooking } = useBooking()
  const ref = useRef(null)
  const [serviceValue, setServiceValue] = useState(service)
  const [success, setSuccess] = useState(false)

  // Reset the form state each time the modal opens
  useEffect(() => {
    if (open) {
      setServiceValue(service)
      setSuccess(false)
    }
  }, [open, service])

  // Escape to close + freeze page scroll while open
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && closeBooking()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [open, closeBooking])

  useEffect(() => {
    if (!success) return undefined
    const id = setTimeout(closeBooking, 2500)
    return () => clearTimeout(id)
  }, [success, closeBooking])

  useGSAP(
    () => {
      if (!open) return
      gsap.from('.modal-backdrop', { autoAlpha: 0, duration: 0.3 })
      gsap.from('.modal-card', { y: 40, scale: 0.94, autoAlpha: 0, duration: 0.5, ease: 'power3.out' })
      gsap.from('.modal-card > form > *', { y: 14, autoAlpha: 0, stagger: 0.05, duration: 0.4, delay: 0.15 })
    },
    { scope: ref, dependencies: [open] },
  )

  if (!open) return null

  return (
    <div ref={ref}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        onClick={(e) => e.target === e.currentTarget && closeBooking()}
        className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <div className="modal-card relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <button aria-label="Close modal" onClick={closeBooking} className="absolute right-5 top-5 p-1 text-xl font-bold text-brand-muted hover:text-brand-charcoal">
            ✕
          </button>
          <div className="mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Online Concierge</span>
            <h3 id="modal-heading" className="mt-1 text-2xl font-bold">
              Book Your Appointment
            </h3>
            <p className="mt-1 text-xs text-brand-muted">Choose a convenient slot. We will reach out to confirm your insurance.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSuccess(true)
            }}
            className="space-y-4"
          >
            <label className="block">
              <span className="field-label">Selected Service</span>
              <input type="text" value={serviceValue} onChange={(e) => setServiceValue(e.target.value)} className="field py-2" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="field-label">Patient Name</span>
                <input type="text" required placeholder="Alex Rivera" autoFocus className="field py-2" />
              </label>
              <label>
                <span className="field-label">Mobile Phone</span>
                <input type="tel" required placeholder="(555) 321-7654" className="field py-2" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="field-label">Date</span>
                <input type="date" required min={today()} className="field py-2" />
              </label>
              <label>
                <span className="field-label">Time Slot</span>
                <select className="field py-2">
                  <option>Morning (8am - 12pm)</option>
                  <option>Afternoon (12pm - 4pm)</option>
                  <option>Late Afternoon (4pm - 6pm)</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              disabled={success}
              className="mt-2 w-full rounded-xl bg-brand-charcoal py-3 text-xs font-bold text-white transition duration-200 hover:bg-brand-teal hover:text-brand-charcoal disabled:opacity-60 sm:text-sm"
            >
              Reserve Appointment Slot
            </button>
            {success && (
              <div role="status" className="rounded-xl bg-emerald-100 p-3 text-center text-xs font-medium text-emerald-800">
                Appointment slot reserved! We have sent a confirmation SMS to your number.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
