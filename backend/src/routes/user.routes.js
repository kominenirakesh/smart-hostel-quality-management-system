import { Router } from "express";
import { registerUser,loginUser, getProfile } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register",verifyJWT,registerUser);
router.post("/login",verifyJWT,loginUser);
router.get("/profile", verifyJWT, getProfile);

export default router;