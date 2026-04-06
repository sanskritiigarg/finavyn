import express from 'express';
import protect from '../middlewares/authenticate.middlewares.js';
import {authorizeAnalyst} from '../middlewares/authorize.middlewares.js';
import { getDashboardByCategory, getDashboardRecent, getDashboardSummary, getDashboardTrends } from '../controllers/dashboard.controllers.js';

const router = express.Router();

// @access Private
router.use(protect);

// @desc Get summary for dashboard
// @route GET /api/dashboard/summary
router.get('/summary', getDashboardSummary);

// @desc Get totals by category for dashboard
// @route GET /api/dashboard/by-category
router.get('/by-category', getDashboardByCategory);

// @desc Get trends over time for dashboard
// @route GET /api/dashboard/trends
router.get('/trends', authorizeAnalyst, getDashboardTrends);

// @desc Get recent records for dashboard
// @route GET /api/dashboard/recent
router.get('/recent', getDashboardRecent);


export default router;