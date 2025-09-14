import { Router } from 'express'
import Booking from '../models/Booking.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

// ✅ Create a new booking
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, category, selectedTour } = req.body

    if (!name || !email || !phone || !category || !selectedTour) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const newBooking = new Booking({ name, email, phone, category, selectedTour })
    await newBooking.save()

    res.json({ message: 'Booking confirmed', booking: newBooking })
  } catch (error) {
    console.error('Booking creation error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ✅ Get all bookings (Admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 })
    res.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

// ✅ Get bookings for the logged-in user
router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email
    const bookings = await Booking.find({ email: userEmail }).sort({ date: -1 })
    res.json({ success: true, bookings })
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    res.status(500).json({ success: false, message: 'Error fetching your bookings' })
  }
})

// ✅ Cancel a booking (only by the booking owner)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" })
    }

    if (booking.email !== req.user.email) {
      return res.status(403).json({ success: false, message: "Unauthorized to cancel this booking" })
    }

    await booking.deleteOne()
    res.json({ success: true, message: "Booking cancelled successfully" })
  } catch (error) {
    console.error("Cancel error:", error)
    res.status(500).json({ success: false, message: "Failed to cancel booking" })
  }
})

export default router
