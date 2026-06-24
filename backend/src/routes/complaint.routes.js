import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createComplaint,getSupervisorComplaints,updateComplaint,getMyComplaints
} from "../controllers/complaint.controller.js";

const router = Router();
router.post("/create",verifyJWT,authorizeRoles("student"),createComplaint);
router.get("/supervisor",verifyJWT,authorizeRoles("supervisor"),getSupervisorComplaints);
router.patch("/:complaintId/update",verifyJWT,authorizeRoles("supervisor"),updateComplaint);
router.get("/my-complaints",verifyJWT,authorizeRoles("student"), getMyComplaints);

export default router;