// routes/adminDashboard.js
import { Router } from 'express'
import Booking from '../models/Booking.js'
import Plan from '../models/Plan.js'
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js'

const router = Router()

// GET /api/admin/bookings
router.get('/bookings', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    const plans = await Plan.find().sort({ createdAt: -1 })

    const formattedBookings = bookings.map(b => ({
      _id: b._id,
      name: b.name,
      email: b.email,
      tripType: 'Booked Trip',
      createdAt: b.createdAt
    }))

    const formattedPlans = plans.map(p => ({
      _id: p._id,
      name: p.email?.split('@')[0] || 'User',
      email: p.email || 'N/A',
      tripType: 'Custom Plan',
      createdAt: p.createdAt
    }))

    const combined = [...formattedBookings, ...formattedPlans].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    res.json(combined)
  } catch (error) {
    console.error("Error in admin bookings route:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router
