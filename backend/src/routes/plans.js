import { Router } from 'express'
import Plan from '../models/Plan.js'

const router = Router()

/**
 * POST /api/plans
 * Create a new custom travel plan
 */
router.post('/', async (req, res) => {
  const {
    destination,
    budget,
    travelers,
    startDate,
    endDate,
    accommodation,
    activities,
    specialRequests,
    contactInfo
  } = req.body

  // Basic Validation
  if (!destination || !travelers || !startDate) {
    return res.status(400).json({
      error: 'Destination, travelers, and start date are required.'
    })
  }

  // Validate contact information
  if (!contactInfo || !contactInfo.name || !contactInfo.email || !contactInfo.phone) {
    return res.status(400).json({
      error: 'Contact information (name, email, phone) is required.'
    })
  }

  try {
    const newPlan = new Plan({
      destination,
      budget: Array.isArray(budget) ? budget[0] : budget,
      travelers,
      startDate,
      endDate,
      accommodation,
      activities,
      specialRequests,
      contactInfo
    })

    await newPlan.save()
    res.json({ message: 'Plan submitted successfully', plan: newPlan })
  } catch (error) {
    console.error('Error creating plan:', error)
    res.status(500).json({ error: 'Failed to submit travel plan.' })
  }
})

/**
 * GET /api/plans
 * Get all submitted plans
 */
router.get('/', async (req, res) => {
  try {
    const allPlans = await Plan.find().sort({ createdAt: -1 })
    res.json(allPlans)
  } catch (error) {
    console.error('Error fetching plans:', error)
    res.status(500).json({ error: 'Failed to fetch travel plans.' })
  }
})

export default router