import { Router } from 'express'
import Trip from '../models/Trip.js'

const router = Router()

/**
 * GET /api/trips
 * Fetch all trips
 */
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 })
    res.json(trips)
  } catch (error) {
    console.error('❌ Failed to fetch trips:', error)
    res.status(500).json({ error: 'Failed to fetch trips' })
  }
})

/**
 * POST /api/trips
 * Add a new trip (optional, for admin use)
 */
router.post('/', async (req, res) => {
  const {
    title,
    category,
    location,
    price,
    duration,
    groupSize,
    rating,
    image,
    description,
    highlights,
  } = req.body

  try {
    const newTrip = new Trip({
      title,
      category,
      location,
      price,
      duration,
      groupSize,
      rating,
      image,
      description,
      highlights,
    })

    await newTrip.save()
    res.json({ message: 'Trip added successfully', trip: newTrip })
  } catch (error) {
    console.error('❌ Error adding trip:', error)
    res.status(500).json({ error: 'Failed to add trip' })
  }
})

export default router
