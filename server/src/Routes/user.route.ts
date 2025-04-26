import { Router } from "express";
import {
	getAllUsers,
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../Controllers/user.controller";
import { isAdmin, isAuthenticated } from "../Middlewares/auth.middleware";

const router = Router();

router.get("/list/:role", isAuthenticated, isAdmin, getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", isAuthenticated, getUserProfile);

export default router;
