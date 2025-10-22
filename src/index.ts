import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

// Routes
app.get('/', (req, res) => {
	res.send('Hello, World! 🤖');
});

app.use('/db', async (req, res) => {
	const db = await pool.query('SELECT current_database();');
	console.log(db.rows[0]);
	res.send(db.rows[0]);
});

// Start the server
app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
});
