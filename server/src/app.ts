require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { catchAsync } from "./Errors/catchAsync";
import { AppError } from "./Errors/errorHandler";
import { errorMiddleWare } from "./Middlewares/errorMiddleware";
const app = express();

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
app.use(errorMiddleWare);

export { app };
