import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Document, model, Schema } from "mongoose";
import validator from "validator";
import { StringValue } from "ms";

require("dotenv").config();

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	courses: Array<{ courseId: string }>;
	role: string;
	avatar?: {
		public_id: string;
		url: string;
	};
	resetPasswordToken?: string;
	resetPasswordExpire?: Date;
	comparePassword(password: string): Promise<boolean>;
	getToken(): string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
	name: {
		type: String,
		required: [true, "Name of user is required"],
	},
	email: {
		type: String,
		required: [true, "User email is required"],
		unique: true,
		validate: validator.isEmail,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minLength: [8, "Password must be more than 8 characters long"],
		select: false,
	},
	courses: [
		{
			type: Schema.ObjectId,
		},
	],
	role: {
		type: String,
		enum: {
			values: ["student", "admin", "instructor"],
			message: "Can only be student or instructor",
		},
		default: "student",
	},
	avatar: {
		public_id: {
			type: String,
			// required: true,
			default: "dummy_id",
		},
		url: {
			type: String,
			// required: true,
			default: "dummy_url",
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getToken = function (): string {
	if (!process.env.JWT_SECRET || !process.env.JWT_EXP) {
		throw new Error(
			"JWT_SECRET or JWT_EXP is not defined in environment variables"
		);
	}
	const secret: Secret = process.env.JWT_SECRET;
	const options: SignOptions = {
		expiresIn: process.env.JWT_EXP as StringValue,
	};
	return jwt.sign({ id: this._id }, secret, options);
};

export const User = model<IUser>("User", userSchema);
