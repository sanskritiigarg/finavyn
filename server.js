import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.middlewares.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// API Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import recordRoutes from './routes/records.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);

app.use(errorHandler);

// Handle 404 route error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    statusCode: 404,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
})

// Handle async errors
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});