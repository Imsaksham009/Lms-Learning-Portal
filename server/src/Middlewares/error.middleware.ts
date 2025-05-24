import { TypeError } from "../Types/error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleWare = (
	error: TypeError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!error.status) error.status = 500;
	if (!error.message) error.message = "Internal Server Error";
	if (error.name === "CastError") {
		error.message = `Not Found!!! Invalid: ${error.path}`;
	}
	if (error.name === "JsonWebTokenError") {
		error.message = `Token is invalid`;
	}

	// if (error.code === 11000) {
	// 	error.message = `User with email ${error.keyValue.email} already exists`;
	// }

	res.status(error.status).json({
		success: false,
		message: error.message,
		errorStack: error.stack,
	});
};
