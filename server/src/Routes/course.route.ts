import { Router } from "express";
import multer from "multer";
import {
	lmsLectureVideoStorage,
	lmsThumbnailStorage,
} from "../Cloudinary/cloudinary";
import {
	addLesson,
	createCourse,
	createSection,
	getCourseDetailsWithId,
	listAllCourses,
} from "../Controllers/course.controller";
import { isAuthenticated, isInstructor } from "../Middlewares/auth.middleware";

const uploadLesson = multer({
	storage: lmsLectureVideoStorage,
	limits: { fileSize: 1024 * 1024 * 100 }, // 100 MB
});

const uploadThumbnail = multer({
	storage: lmsThumbnailStorage,
});

const router = Router();
//list all courses
router.get("/list", listAllCourses);
//get course details with id
router.get("/list/:id", getCourseDetailsWithId);
//create a new course
router.post(
	"/new",
	isAuthenticated,
	uploadThumbnail.single("thumbnail"),
	createCourse
);

//create a new section in a course
router.put(
	"/section/add/:courseId",
	isAuthenticated,
	isInstructor,
	createSection
);

//add a lesson to a section in a course
router.put(
	"/lesson/add/:courseId/:sectionId",
	isAuthenticated,
	isInstructor,
	uploadLesson.single("lessonFile"),
	addLesson
);

export default router;
