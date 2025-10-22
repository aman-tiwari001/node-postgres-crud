import { Pool } from 'pg';
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
	console.log('🔥 Connection pool established with the database');
});

pool.on('error', (err) => {
	console.log('Unable to connect to the database: ', err);
});

export default pool;
