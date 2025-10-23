import express from 'express';
import {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} from '../controllers/userController.js';
import {
	validateId,
	validateUserSchema,
	validatePartialUserSchema,
} from '../middlewares/validateInput.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', validateId, getUserById);
router.post('/', validateUserSchema, createUser);
router.put('/:id', validateId, validatePartialUserSchema, updateUser);
router.delete('/:id', validateId, deleteUser);

export default router;
