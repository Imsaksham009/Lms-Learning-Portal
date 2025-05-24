import { Router } from "express";
import {
	addLesson,
	createCourse,
	createSection,
	getCourseDetailsWithId,
	listAllCourses,
} from "../Controllers/course.controller";
import { isAuthenticated, isInstructor } from "../Middlewares/auth.middleware";
import multer from "multer";
import { lmsLectureVideoStorage } from "../Cloudinary/cloudinary";

const upload = multer({
	storage: lmsLectureVideoStorage,
	limits: { fileSize: 1024 * 1024 * 100 }, // 100 MB
});

const router = Router();
//list all courses
router.get("/list", listAllCourses);
//get course details with id
router.get("/list/:id", getCourseDetailsWithId);
//create a new course
router.post("/new", isAuthenticated, createCourse);

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
	upload.single("lectureFile"),
	addLesson
);

export default router;
