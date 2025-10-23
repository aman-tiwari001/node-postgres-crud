import type { NextFunction, Request, Response } from 'express';
import responseHandler from '../utils/responseHandler.js';

const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(`❌ [Error] ${req.method} ${req.url}`);
	console.log(error.stack);
	responseHandler(
		res,
		error.statusCode || 500,
		null,
		error.message || 'Internal Server Error'
	);
};

export default errorHandler;
