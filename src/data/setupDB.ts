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
      city VARCHAR(100),
      country VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW()
    );`;
		await pool.query(queryText);
		console.log('✅ Users table created if not exist');
	} catch (error) {
		console.log('❌ Unable to create users table in DB: ', error);
	}
};

const setupDB = async () => {
	await createUserTable();
};

export { createUserTable, setupDB };
