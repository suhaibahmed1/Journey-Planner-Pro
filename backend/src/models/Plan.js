import mongoose from 'mongoose'

const planSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  budget: { type: Number, required: true }, // Changed from array to single number
  travelers: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  accommodation: { type: String },
  activities: { type: [String], default: [] }, // Changed from String to array of strings
  specialRequests: { type: String },
  contactInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Plan', planSchema)