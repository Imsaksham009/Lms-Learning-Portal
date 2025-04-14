import { Router } from "express";
import {
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../Controllers/userController";
import { isAuthenticated } from "../Middlewares/auth";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", isAuthenticated, logoutUser);

router.get("/me", isAuthenticated, getUserProfile);

export default router;
