import { NextFunction, Response } from "express";
import mongoose, { Document } from "mongoose";
import { catchAsync } from "../Errors/catchAsync";
import { AppError } from "../Errors/errorHandler";
import { Course, ICourse, ILesson, ISection } from "../Models/course.model";
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

		if (course.instructorId.toString() !== req.user?._id?.toString()) {
			return next(
				new AppError(404, "You are not allowed to add content in this course")
			);
		}

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

export const addLesson = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		if (!req.file)
			return next(new AppError(404, "Please upload the lecture you want add"));
		const { courseId, sectionId } = req.params;

		if (!courseId || !sectionId)
			return next(
				new AppError(
					404,
					"Please provide the proper details of course and sectiion"
				)
			);

		const course = await Course.findById(courseId);

		if (!course)
			return next(
				new AppError(404, "Please create a course first to add lessons")
			);
		if (course.instructorId.toString() !== req.user?._id?.toString()) {
			return next(
				new AppError(404, "You are not authorized to access this resource")
			);
		}

		const sectionsIndex: number = course?.sections.findIndex(
			(section) => section._id.toString() === sectionId
		);

		if (sectionsIndex === -1)
			return next(
				new AppError(404, "Please create a section to add the lesson")
			);

		const { title, description, duration } = req.body;

		const newLesson: ILesson = {
			_id: new mongoose.Types.ObjectId(),
			title,
			description,
			videoUrl: req.file?.path,
			duration,
			order: course.sections[sectionsIndex].lessons.length + 1,
			createdAt: new Date(),
		};

		course.sections[sectionsIndex].lessons.push(newLesson);
		await course.save({ validateBeforeSave: false });

		return res.status(200).json({
			success: true,
			message: "Lesson addded successfully",
			course,
		});
	}
);

//TODO: PAGINATION
export const listAllCourses = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const courses = await Course.find();

		return res.status(200).json({
			success: true,
			courses,
		});
	}
);
