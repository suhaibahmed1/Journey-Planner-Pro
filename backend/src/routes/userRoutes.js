import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router()

// ✅ Protected Route Example
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: `Welcome ${req.user.email}`,
    data: 'This is protected dashboard data',
  })
})

export default router
