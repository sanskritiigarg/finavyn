import express from 'express';
import protect from '../middlewares/authenticate.middlewares.js';
import {
  getProfile,
  login,
  register,
} from '../controllers/auth.controllers.js';

const router = express.Router();

// @access Public
// @desc Register new user
// @route POST /api/users/register
router.post('/register', register);

// @access Public
// @desc Login user
// @route POST /api/users/login
router.post('/login', login);

// @access Private
// @desc Get user profile
// @route GET /api/users/profile
router.get('/profile', protect, getProfile);

export default router;