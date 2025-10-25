import Joi from 'joi';
import type { NextFunction, Request, Response } from 'express';

const userSchema = Joi.object({
	first_name: Joi.string().min(1).max(50).required(),
	last_name: Joi.string().min(1).max(50).required(),
	email: Joi.string().email().max(150).required(),
	phone: Joi.string().min(7).max(20),
	address: Joi.object({
		street: Joi.string().min(1).max(150),
		city: Joi.string().min(1).max(100).required(),
		state: Joi.string().min(1).max(100).required(),
		zip_code: Joi.string().min(1).max(20).required(),
		country: Joi.string().min(1).max(100).required(),
	}).required(),
});

const validateUserSchema = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const result = userSchema.validate(req.body, {
		abortEarly: false,
		stripUnknown: true,
	});

	if (result.error) {
		throw new Error(`Validation error: ${result.error.message}`);
	}

	req.body = result.value;
	next();
};

const validatePartialUserSchema = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const result = userSchema
		.fork(
			['first_name', 'last_name', 'email', 'phone', 'address'],
			(schema) => schema.optional()
		)
		.validate(req.body, { abortEarly: false, stripUnknown: true });

	if (result.error) {
		throw new Error(`Validation error: ${result.error.message}`);
	}

	req.body = result.value;
	next();
};

const validateId = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	if (isNaN(Number(id)) || Number(id) <= 0) {
		throw new Error('Validation error: ID must be a positive number');
	}
	next();
};

export { validateUserSchema, validatePartialUserSchema, validateId };
