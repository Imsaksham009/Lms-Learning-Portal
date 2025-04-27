import { Router } from "express";
import {
	addLesson,
	createCourse,
	createSection,
	listAllCourses,
} from "../Controllers/course.controller";
import { isAuthenticated, isInstructor } from "../Middlewares/auth.middleware";
import multer from "multer";
import { lmsLectureVideoStorage } from "../Cloudinary/cloudinary";

const upload = multer({
	storage: lmsLectureVideoStorage,
	limits: { fileSize: 100000 },
});

const router = Router();

router.get("/list", listAllCourses);
router.post("/new", isAuthenticated, createCourse);

router.put(
	"/section/add/:courseId",
	isAuthenticated,
	isInstructor,
	createSection
);

router.put(
	"/lesson/add/:courseId/:sectionId",
	isAuthenticated,
	isInstructor,
	upload.single("lectureFile"),
	addLesson
);

export default router;
