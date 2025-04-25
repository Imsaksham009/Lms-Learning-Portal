import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../Errors/catchAsync";
import { Course, ICourse, ISection } from "../Models/course.model";
import { AppError } from "../Errors/errorHandler";
import { RequestWithUser } from "./user.controller";
import mongoose, { Document } from "mongoose";

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
		const course: ICourseBody = await Course.create({
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

export const createSection = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const { courseId } = req.params;
		console.log(courseId);
		if (!courseId) return next(new AppError(404, "Please mention the course"));

		const course = await Course.findById(courseId);
		if (!course)
			return next(new AppError(404, "Please create the course first"));

		const { title } = req.body;

		const newSection: ISection = {
			_id: new mongoose.Types.ObjectId(),
			title,
			order: course.sections.length + 1,
			lessons: [],
			createdAt: new Date(),
		};

		course.sections.push(newSection);
		await course.save({ validateBeforeSave: false });

		return res.status(200).json({
			success: true,
			message: "Section created successfully",
			course: course,
		});
	}
);
