import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../Errors/catchAsync";
import { AppError } from "../Errors/errorHandler";
import { User } from "../Models/User/userModel";

interface UserRegistration {
	name: string;
	email: string;
	password: string;
	avatar?: {
		public_id: string;
		url: string;
	};
	getToken(): string;
}

interface UserLogin {
	email: string;
	password: string;
}

export const registerUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, password } = req.body;
		const user: UserRegistration = await User.create({
			name,
			email,
			password,
		});
		const token = user.getToken();
		res
			.status(200)
			.cookie("token", token, {
				maxAge: 5 * 24 * 60 * 60 * 100,
				httpOnly: true,
			})
			.json({
				success: true,
				message: "User Registered",
				token: token,
				user: user,
			});
	}
);

export const loginUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password }: UserLogin = req.body;
		if (!password)
			return next(new AppError(404, "Enter the credentials properly"));

		const user = await User.findOne({ email }).select("+password");
		if (!user)
			return next(
				new AppError(404, "User not found! Enter the credential properly")
			);

		const isUserPasswordCorrect: boolean = await user.comparePassword(password);
		if (!isUserPasswordCorrect)
			return next(new AppError(404, "Enter the credentials properly"));

		const token = user.getToken();
		res
			.status(200)
			.cookie("token", token, {
				maxAge: 5 * 24 * 60 * 60 * 100,
				httpOnly: true,
			})
			.json({
				success: true,
				message: "User Logged-in",
				user: user,
			});
	}
);
