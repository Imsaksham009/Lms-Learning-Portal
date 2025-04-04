import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/userController";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
