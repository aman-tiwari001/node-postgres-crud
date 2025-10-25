import pool from '../config/db.js';
import type { AddressType, UserType } from '../types/index.js';

/**
 * To get all users along with their addresses
 * @param none
 * @returns Array of Users
 */
const getAllUsersService = async () => {
	const result = await pool.query(`
	SELECT 
		u.id,
		u.first_name,
		u.last_name,
		u.email,
		u.phone,
		a.street,
		a.city,
		a.state,
		a.zip_code,
		a.country,
		u.created_at
	FROM users u
	LEFT JOIN addresses a 
  ON u.id = a.user_id;
`);
	return result.rows;
};

/**
 * To get user by ID
 * @param id
 * @returns A user
 */
const getUserByIdService = async (id: number) => {
	const result = await pool.query(
		`
		SELECT 
			u.id,
			u.first_name,
			u.last_name,
			u.email,
			u.phone,
			a.street,
			a.city,
			a.state,
			a.zip_code,
			a.country,
			u.created_at
		FROM users u, addresses a
		WHERE u.id = $1
		AND a.user_id = $1;`,
		[id]
	);
	return result.rows[0];
};

/**
 * To create a new user
 * @param userData
 * @returns Created user
 */
const createUserService = async (userData: UserType) => {
	const { first_name, last_name, email, phone, address } = userData;
	const { street, city, state, zip_code, country } = address;

	const userResult = await pool.query(
		`
		INSERT 
		INTO users (first_name, last_name, email, phone) 
		VALUES ($1, $2, $3, $4) 
		RETURNING id, first_name, last_name, email, phone;`,
		[first_name, last_name, email, phone]
	);
	console.log(userResult.rows);

	const addressResult = await pool.query(
		`
		INSERT 
		INTO addresses (user_id, street, city, state, zip_code, country) 
		VALUES ($1, $2, $3, $4, $5, $6) 
		RETURNING street, city, state, zip_code, country;`,
		[userResult.rows[0].id, street, city, state, zip_code, country]
	);
	console.log(addressResult.rows);

	const result = {
		...userResult.rows[0],
		...addressResult.rows[0],
	};
	return result;
};

/**
 * To update an existing user
 * @param id
 * @param userData Partial user data
 * @returns Updated user
 */
const updateUserService = async (id: number, userData: Partial<UserType>) => {
	const { first_name, last_name, email, phone, address } = userData;
	const { street, city, state, zip_code, country } = address || {};

	const userResult = await pool.query(
		`
		UPDATE users 
		SET 
		 	first_name = COALESCE($1, first_name), 
			last_name = COALESCE($2, last_name), 
			email = COALESCE($3, email), 
			phone = COALESCE($4, phone) 
		WHERE id = $5 
		RETURNING id, first_name, last_name, email, phone;`,
		[first_name, last_name, email, phone, id]
	);

	const addressResult = await pool.query(
		`
		UPDATE addresses
		SET 
			street = COALESCE($1, street), 
			city = COALESCE($2, city),
			state = COALESCE($3, state),
			zip_code = COALESCE($4, zip_code),	
			country = COALESCE($5, country)
		WHERE user_id = $6 
		RETURNING street, city, state, zip_code, country;`,
		[street, city, state, zip_code, country, id]
	);

	const result = {
		...userResult.rows[0],
		...addressResult.rows[0],
	};
	return result;
};

/**
 * To delete a user
 * @param id
 * @returns Deleted user
 */
const deleteUserService = async (id: number) => {
	const result = await pool.query(
		`
		DELETE 
		FROM users 
		WHERE id = $1 
		RETURNING *;`,
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
