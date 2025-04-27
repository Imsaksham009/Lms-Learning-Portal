import { Router } from "express";
import {
	getAllUsers,
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../Controllers/user.controller";
import { isAdmin, isAuthenticated } from "../Middlewares/auth.middleware";
import { lmsAvatarStorage } from "../Cloudinary/cloudinary";
import multer from "multer";

const upload = multer({ storage: lmsAvatarStorage });

const router = Router();

router.get("/list/:role", isAuthenticated, isAdmin, getAllUsers);

router.post("/register", upload.single("avatar"), registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", isAuthenticated, getUserProfile);

export default router;
