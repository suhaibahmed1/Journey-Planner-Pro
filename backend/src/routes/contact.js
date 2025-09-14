import { Router } from 'express'
import Contact from '../models/Contact.js'

const router = Router()

/**
 * POST /api/contact
 * Save a contact message
 */
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All required fields must be filled.' })
  }

  try {
    const newMessage = new Contact({ name, email, phone, subject, message })
    await newMessage.save()
    res.json({ message: 'Thank you! Your message has been received.' })
  } catch (error) {
    console.error('Error saving contact:', error)
    res.status(500).json({ error: 'Something went wrong while submitting the form.' })
  }
})

/**
 * GET /api/contact
 * Fetch all contact messages
 */
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ receivedAt: -1 })
    res.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

export default router
