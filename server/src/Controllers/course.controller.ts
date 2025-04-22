import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../Errors/catchAsync";
import { Course, ICourse } from "../Models/course.model";
import { AppError } from "../Errors/errorHandler";
import { RequestWithUser } from "./user.controller";

interface ICourseBody extends ICourse, Document {
	title: string;
	description: string;
	level: string;
	price: number;
	tags: string[];
	category: string;
}

export const createCourse = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const { title, description, level, price, tags, category } = req.body;

		const slug = title
			.toLowerCase()
			.replace(/[^\w\s]/gi, "") // Remove special characters
			.replace(/\s+/g, "-"); // Replace spaces with hyphens

		const existingCourse = await Course.findOne({ slug });
		if (existingCourse) {
			return next(
				new AppError(400, "Course with similar title already exists!")
			);
		}

		const instructorId = req.user?._id;
		if (!instructorId) {
			return next(
				new AppError(401, "Please login as instructor to create a course")
			);
		}
		const course: ICourseBody = new Course({
			title,
			description,
			level,
			price,
			tags,
			category,
			slug,
			instructorId,
			sections: [],
		});

		return res.status(200).json({
			success: true,
			message: "Course created successfully",
			course,
		});
	}
);
