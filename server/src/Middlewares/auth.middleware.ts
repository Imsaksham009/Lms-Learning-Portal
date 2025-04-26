import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { catchAsync } from "../Errors/catchAsync";
import { AppError } from "../Errors/errorHandler";
import { User } from "../Models/user.model";
import { RequestWithUser } from "../Controllers/user.controller";

interface JWTUser extends JwtPayload {
	id: string;
}

export const isAuthenticated = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const { token } = req.cookies;
		if (!token) return next(new AppError(404, "Login to access the resource"));

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as Secret
		) as JWTUser;

		const user = await User.findById(decoded.id);

		if (!user) return next(new AppError(404, "User not found!"));

		req.user = user;
		next();
	}
);

export const isInstructor = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const user = req.user;
		if (req.user?.role !== "instructor")
			return next(
				new AppError(
					404,
					"Only instructors are allowed to access this resource"
				)
			);

		next();
	}
);

export const isAdmin = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const user = req.user;
		console.log(user);
		if (req.user?.role !== "admin")
			return next(
				new AppError(404, "Only admins are allowed to access this resource")
			);

		next();
	}
);
