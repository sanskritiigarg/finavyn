import express from 'express';
import protect from '../middlewares/authenticate.middlewares.js';
import {authorizeAdmin} from '../middlewares/authorize.middlewares.js'
import { createFinancialRecord, deleteFinancialRecord, getAllRecords, getOneRecord, updateFinancialRecord } from '../controllers/records.controllers.js';

const router = express.Router();

// @access Private
router.use(protect);

// @desc Create a record
// @route POST /api/records/
router.post('/', createFinancialRecord);

// @desc Get all records
// @route GET /api/records/
router.get('/', getAllRecords);

// @desc Get a record by id
// @route GET /api/records/:id
router.get('/:id', getOneRecord);

// @desc Update a record by id
// @route PUT /api/records/:id
router.put('/:id', authorizeAdmin, updateFinancialRecord);

// @desc Delete a record by id
// @route DELETE /api/records/:id
router.delete('/:id', authorizeAdmin, deleteFinancialRecord)

export default router;