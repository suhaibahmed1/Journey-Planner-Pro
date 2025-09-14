import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['pakistan', 'international'], required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  groupSize: { type: String },
  rating: { type: Number, default: 0 },
  image: { type: String },
  description: { type: String },
  highlights: { type: [String] },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Trip', tripSchema)
