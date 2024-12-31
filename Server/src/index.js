import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/index.js';  // Assuming you have a file to connect DB
import taskRoutes from './routes/taskRoutes.js';  // Import the routes for tasks

const PORT = process.env.PORT || 3001;
dotenv.config({
  path: './.env'
});  // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies


// Use the task routes (CRUD operations)
app.use('/api', taskRoutes);  // All routes will be prefixed with /api

// Connect to the database
connectDB()
// Start the server
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MONGODB Connection Error', error);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});
