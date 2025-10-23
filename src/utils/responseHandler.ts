import type { Response } from 'express';

/**
 * Response handler utility
 * @param res response object
 * @param statusCode HTTP status code
 * @param data response data
 * @param message response message
 * @returns JSON response { status, message, data }
 */
const responseHandler = (
	res: Response,
	statusCode: number,
	data: any,
	message: string
) => {
	return res.status(statusCode).json({
		status: statusCode,
		message,
		data,
	});
};

export default responseHandler;
