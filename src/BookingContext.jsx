import { createContext, useCallback, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [modal, setModal] = useState({ open: false, service: 'General Dental Consultation' })

  const openBooking = useCallback((service = 'General Dental Consultation') => {
    setModal({ open: true, service })
  }, [])

  const closeBooking = useCallback(() => {
    setModal((m) => ({ ...m, open: false }))
  }, [])

  return (
    <BookingContext.Provider value={{ ...modal, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
