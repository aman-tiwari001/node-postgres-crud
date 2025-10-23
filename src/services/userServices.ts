import pool from '../config/db.js';
import type { UserType } from '../types/index.js';

/**
 * To get all users
 * @param none
 * @returns Array of Users
 */

const getAllUsersService = async () => {
	const result = await pool.query('SELECT * FROM users;');
	return result.rows;
};

/**
 * To get user by ID
 * @param id
 * @returns A user
 */
const getUserByIdService = async (id: number) => {
	const result = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
	return result.rows[0];
};

/**
 * To create a new user
 * @param userData
 * @returns Created user
 */
const createUserService = async (userData: UserType) => {
	const { first_name, last_name, email, phone, city, country } = userData;
	const result = await pool.query(
		'INSERT INTO users (first_name, last_name, email, phone, city, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
		[first_name, last_name, email, phone, city, country]
	);
	return result.rows[0];
};

/**
 * To update an existing user
 * @param id
 * @param userData Partial user data
 * @returns Updated user
 */
const updateUserService = async (id: number, userData: Partial<UserType>) => {
	const { first_name, last_name, email, phone, city, country } = userData;
	const result = await pool.query(
		'UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email), phone = COALESCE($4, phone), city = COALESCE($5, city), country = COALESCE($6, country) WHERE id = $7 RETURNING *;',
		[first_name, last_name, email, phone, city, country, id]
	);
	return result.rows[0];
};

/**
 * To delete a user
 * @param id
 * @returns Deleted user
 */
const deleteUserService = async (id: number) => {
	const result = await pool.query(
		'DELETE FROM users WHERE id = $1 RETURNING *;',
		[id]
	);
	return result.rows[0];
};

export {
	getAllUsersService,
	getUserByIdService,
	createUserService,
	updateUserService,
	deleteUserService,
};
