import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  selectedTour: { type: String, required: true }
}, { timestamps: true })  // ✅ Adds createdAt and updatedAt automatically

export default mongoose.model('Booking', bookingSchema)
