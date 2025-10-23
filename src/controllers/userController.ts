import type { NextFunction, Request, Response } from 'express';
import {
	createUserService,
	deleteUserService,
	getAllUsersService,
	getUserByIdService,
	updateUserService,
} from '../services/userServices.js';
import type { UserType } from '../types/index.js';
import responseHandler from '../utils/responseHandler.js';

// GET /api/v1/users - Get all users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await getAllUsersService();
		responseHandler(res, 200, users, 'Users retrieved successfully');
	} catch (error) {
		next(error);
	}
};

// GET /api/v1/users/:id - Get user by ID
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const user = await getUserByIdService(Number(id));
		if (!user) {
			return responseHandler(res, 404, null, 'User not found');
		}
		responseHandler(res, 200, user, 'User retrieved successfully');
	} catch (error) {
		next(error);
	}
};

// POST /api/v1/users - Create a new user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { first_name, last_name, email, phone, city, country } = req.body;
		const newUser = await createUserService({
			first_name,
			last_name,
			email,
			phone,
			city,
			country,
		} as UserType);
		responseHandler(res, 201, newUser, 'User created successfully');
	} catch (error) {
		next(error);
	}
};

// PUT /api/v1/users/:id - Update an existing user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { first_name, last_name, email, phone, city, country } = req.body;
		const updatedUser = await updateUserService(Number(id), {
			first_name,
			last_name,
			email,
			phone,
			city,
			country,
		} as Partial<UserType>);
		if (!updatedUser) {
			return responseHandler(res, 404, null, 'User not found');
		}
		responseHandler(res, 200, updatedUser, 'User updated successfully');
	} catch (error) {
		next(error);
	}
};

// DELETE /api/v1/users/:id - Delete a user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const deletedUser = await deleteUserService(Number(id));
		if (!deletedUser) {
			return responseHandler(res, 404, null, 'User not found');
		}
		responseHandler(res, 200, deletedUser, 'User deleted successfully');
	} catch (error) {
		next(error);
	}
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
