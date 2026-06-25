import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import { testCloudinary } from "../controllers/debug.controller.js";

const router = Router();

router.post(
  "/cloudinary",
  upload.single("image"),
  testCloudinary
);

export default router;