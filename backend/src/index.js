import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 

import authRoutes from './routes/auth.js';
import tripsRoutes from './routes/trips.js';
import bookingsRoutes from './routes/bookings.js';
import contactRoutes from './routes/contact.js';
import plansRoutes from './routes/plans.js';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
import adminDashboardRoutes from './routes/adminDashboard.js';

dotenv.config();
const app = express();

// ✅ Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/admin', adminDashboardRoutes);



// ✅ Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`✅ Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
