import { Router } from "express";
import { createCourse, createSection } from "../Controllers/course.controller";
import { isAuthenticated } from "../Middlewares/auth.middleware";

const router = Router();

router.post("/new", isAuthenticated, createCourse);

router.put("/section/add/:courseId", isAuthenticated, createSection);

export default router;
