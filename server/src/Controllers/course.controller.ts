import { NextFunction, Response } from "express";
import { Document } from "mongoose";
import { catchAsync } from "../Errors/catchAsync";
import { AppError } from "../Errors/errorHandler";
import { Course, ICourse } from "../Models/course.model";
import { ILesson, Lesson } from "../Models/lesson.model";
import { ISection, Section } from "../Models/section.model";
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
		if (!req.file)
			return next(
				new AppError(404, "Please upload the thumbnail of Course to procedd")
			);
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
			thumbnail: req.file?.path,
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

		const newSection: ISection = await Section.create({
			courseId: course.id,
			title,
			order: course.sections.length + 1,
			createdAt: new Date(),
		});

		course.sections.push(newSection._id);
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
					"Please provide the proper details of course and section"
				)
			);

		const course = await Course.findById(courseId);
		if (!course)
			return next(
				new AppError(404, "Please create a course first to add lessons")
			);
		if (course.instructorId.toString() !== req.user?._id?.toString()) {
			return next(
				new AppError(403, "You are not authorized to access this resource")
			);
		}

		const section = await Section.findById(sectionId);
		if (!section)
			return next(new AppError(404, "Please create a section first"));
		if (section.courseId.toString() !== course.id.toString()) {
			return next(
				new AppError(404, "This section does not belong to this course")
			);
		}

		const { title, description, duration } = req.body;

		const newLesson: ILesson = await Lesson.create({
			courseId: course._id,
			sectionId: sectionId,
			title,
			description,
			videoUrl: req.file?.path,
			duration,
			order: (section.lessons?.length || 0) + 1,
			createdAt: new Date(),
		});

		section.lessons.push(newLesson._id);
		await section.save({ validateBeforeSave: false });

		return res.status(200).json({
			success: true,
			message: "Lesson added successfully",
			lesson: newLesson,
		});
	}
);

//TODO: PAGINATION
export const listAllCourses = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const courses = await Course.find()
			.populate("instructorId", "name email")
			.select("_id title description price instructorId slug thumbnail");

		return res.status(200).json({
			success: true,
			courses,
		});
	}
);

export const getCourseDetailsWithId = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const { id } = req.params;
		if (!id) return next(new AppError(404, "Please provide the course id"));

		const course = await Course.findById(id).populate("instructorId sections");
		if (!course) return next(new AppError(404, "Course not found"));

		return res.status(200).json({
			success: true,
			course,
		});
	}
);

export const getCourseDetailsWithSlug = catchAsync(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const { slug } = req.params;
		if (!slug) return next(new AppError(404, "Please provide the course name"));

		const course = await Course.findOne({ slug });
		if (!course) return next(new AppError(404, "Course not found"));

		return res.status(200).json({
			success: true,
			course,
		});
	}
);
