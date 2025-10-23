import { Pool } from 'pg';
import dotenv from 'dotenv'
dotenv.config()

// Create a connection pool
const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

// Event listeners
pool.on('connect', () => {
	console.log('✅ New database connection established and added to connection pool');
});

pool.on('error', (err) => {
	console.log('Unable to connect to the database: ', err);
});

export default pool;
