require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { catchAsync } from "./Errors/catchAsync";
import { AppError } from "./Errors/errorHandler";
import { errorMiddleWare } from "./Middlewares/error.middleware";
import courseRoute from "./Routes/course.route";
import userRoute from "./Routes/user.route";
const app = express();

//security middlewares
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});
app.use(hpp());
app.use(helmet());
app.use(limiter);

//logger
process.env.NODE_ENV === "development" && app.use(morgan("dev"));

//parsers
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));

//cors
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	})
);

//test api- will be removed later
app.get(
	"/test",
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		return next(new AppError(400, "Error"));
	})
);

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

//unmatched routes - 404 BAD REQUEST
app.get("*", (req: Request, res: Response) => {
	res.status(404).json({
		message: "Route not found",
	});
});

//error middleware
app.use(errorMiddleWare);

export { app };
