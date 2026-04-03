import express from 'express';
import protect from '../middlewares/authenticate.middlewares.js';
import {authorizeAdmin} from '../middlewares/authorize.middlewares.js';
import { deleteUser, getAllUsers, getUserById, updateUserRole, updateUserStatus } from '../controllers/users.controllers.js';

const router = express.Router();

// @access Private (admins only)
router.use(protect);
router.use(authorizeAdmin);


// @desc Get all users
// @route GET /api/users
router.get('/', getAllUsers);

// @desc Get a user by id
// @route GET /api/users/:id
router.get('/:id', getUserById);

// @desc Update user role
// @route PUT /api/users/:id/role
router.put('/:id/role', updateUserRole);

// @desc Update user role
// @route PUT /api/users/:id/status
router.put('/:id/status', updateUserStatus);

// @desc Soft-delete user
// @route DELETE /api/users
router.delete('/:id', deleteUser);

export default router;