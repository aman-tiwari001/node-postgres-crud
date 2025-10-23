import cors from 'cors';
import morgan from 'morgan';
import express, { type Request, type Response } from 'express';
import { setupDB } from './data/setupDB.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import responseHandler from './utils/responseHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

// Setup database (create DB and tables if not exist)
setupDB();

// Routes
app.get('/', (req: Request, res: Response) => {
	responseHandler(res, 200, null, 'Hello World 🐘');
});

app.use('/api/v1/users', userRoutes);

// Handle undefined routes
app.use((req: Request, res: Response) => {
	responseHandler(res, 404, null, `Route ${req.method} ${req.url} not found`);
});

// Centralized Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
});
