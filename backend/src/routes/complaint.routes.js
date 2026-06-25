import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  createComplaint,getSupervisorComplaints,updateComplaint,getMyComplaints,reopenComplaint
} from "../controllers/complaint.controller.js";

const router = Router();
router.post( "/create",verifyJWT,authorizeRoles("student"),upload.single("image"),createComplaint);
router.get("/supervisor",verifyJWT,authorizeRoles("supervisor"),getSupervisorComplaints);
router.patch("/:complaintId/update",verifyJWT,authorizeRoles("supervisor"),updateComplaint);
router.get("/my-complaints",verifyJWT,authorizeRoles("student"), getMyComplaints);
router.patch("/:complaintId/reopen",verifyJWT,authorizeRoles("student"),reopenComplaint);

export default router;