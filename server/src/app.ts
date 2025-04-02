require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "./Types/error";
import { AppError } from "./Errors/errorHandler";
import { catchAsync } from "./Errors/catchAsync";
export const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CLIENT_URL,
	})
);
app.get(
	"/test",
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		return next(new AppError(400, "Error"));
	})
);

//unmatched routes
app.get("*", (req: Request, res: Response) => {
	res.status(404).json({
		message: "Route not found",
	});
});

//error middleware
app.use(
	(error: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
		if (!error.status) error.status = 404;

		res.status(error.status).json({
			success: false,
			message: error.message,
		});
	}
);
