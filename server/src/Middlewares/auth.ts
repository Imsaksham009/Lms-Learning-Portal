import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { catchAsync } from "../Errors/catchAsync";
import { AppError } from "../Errors/errorHandler";
import { User } from "../Models/userModel";
import { RequestWithUser } from "../Controllers/userController";

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
