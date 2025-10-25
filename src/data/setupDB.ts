import pool from '../config/db.js';

const createUserTable = async () => {
	try {
		const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT NOW()
    );`;
		await pool.query(queryText);
		console.log('✅ Users table created if not exist');
	} catch (error) {
		console.log('❌ Unable to create users table in DB: ', error);
	}
};

const createAddressTable = async () => {
	try {
		const queryText = `
    CREATE TABLE IF NOT EXISTS addresses (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      street VARCHAR(150),
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      zip_code VARCHAR(20) NOT NULL,
      country VARCHAR(100) NOT NULL
    );`;
		await pool.query(queryText);
		console.log('✅ Addresses table created if not exist');
	} catch (error) {
		console.log('❌ Unable to create addresses table in DB: ', error);
	}
};

const setupDB = async () => {
	await createUserTable();
  await createAddressTable();
};

export { createUserTable, setupDB };
