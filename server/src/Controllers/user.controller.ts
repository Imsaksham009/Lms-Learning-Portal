import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../Errors/catchAsync";
import { AppError } from "../Errors/errorHandler";
import { IUser, User } from "../Models/user.model";
import { redis } from "../Redis/redis";
import { Document } from "mongoose";

interface UserRegistration extends IUser, Document {
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

export interface RequestWithUser extends Request {
	user?: IUser | null;
}

export const registerUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.file)
			return next(new AppError(404, "Please upload the avatar of your choice"));

		const { name, email, password } = req.body;
		const user: UserRegistration = await User.create({
			name,
			email,
			password,
			avatar: {
				public_id: req.file?.filename || "",
				url: req.file?.path || "",
			},
		});
		const token = user.getToken();
		// await redis.set(user.id, JSON.stringify(user) as any);
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
		// await redis.set(user.id, JSON.stringify(user) as any);
		res
			.status(200)
			.cookie("token", token, {
				maxAge: 5 * 24 * 60 * 60 * 100,
				httpOnly: true,
			})
			.json({
				success: true,
				message: "User Logged-in",
			});
	}
);

export const getUserProfile = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const userId = req.user?.id;

		const user = await User.findById(userId);

		res.status(200).json({
			success: true,
			user,
		});
	}
);

export const logoutUser = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		res.clearCookie("token");
		req.user = null;
		res.status(200).json({
			success: true,
			message: "User logged out successfully",
		});
	}
);

//TODO: PAGINATION
export const getAllUsers = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const { role } = req.params;
		if (role !== "student" && role !== "instructor" && role !== "all")
			return next(
				new AppError(404, "We currently dont have the role mentioned")
			);
		let users;
		if (role === "all") users = await User.find();
		else users = await User.find({ role });

		return res.status(200).json({
			success: true,
			users,
		});
	}
);
