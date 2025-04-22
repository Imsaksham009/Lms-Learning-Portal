import { Router } from "express";
import { createCourse } from "../Controllers/course.controller";
import { isAuthenticated } from "../Middlewares/auth.middleware";

const router = Router();

router.post("/new", isAuthenticated, createCourse);

export default router;
