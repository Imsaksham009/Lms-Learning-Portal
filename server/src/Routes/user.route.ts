import { Router } from "express";
import {
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../Controllers/user.controller";
import { isAuthenticated } from "../Middlewares/auth.middleware";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", isAuthenticated, getUserProfile);

export default router;
