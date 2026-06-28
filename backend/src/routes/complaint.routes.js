import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import upload from "../middleware/multer.middleware.js";

import {
  createComplaint,
  getSupervisorComplaints,
  updateComplaint,
  getMyComplaints,
  reopenComplaint,
  getComplaintById,
  getSupervisorComplaintById,
} from "../controllers/complaint.controller.js";

const router = Router();

/* ===========================================================
   Student Routes
=========================================================== */

router.post(
  "/create",
  verifyJWT,
  authorizeRoles("student"),
  upload.single("image"),
  createComplaint
);

router.get(
  "/my-complaints",
  verifyJWT,
  authorizeRoles("student"),
  getMyComplaints
);

router.patch(
  "/:complaintId/reopen",
  verifyJWT,
  authorizeRoles("student"),
  reopenComplaint
);

/* ===========================================================
   Supervisor Routes
=========================================================== */

router.get(
  "/supervisor",
  verifyJWT,
  authorizeRoles("supervisor"),
  getSupervisorComplaints
);

router.patch(
  "/:complaintId/update",
  verifyJWT,
  authorizeRoles("supervisor"),
  updateComplaint
);

/* ===========================================================
   Complaint Details
   Student -> Own Complaint
   Supervisor -> Assigned Complaint
=========================================================== */

router.get("/:complaintId", verifyJWT, (req, res, next) => {
  switch (req.user.role) {
    case "student":
      return getComplaintById(req, res, next);

    case "supervisor":
      return getSupervisorComplaintById(req, res, next);

    default:
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
  }
});

export default router;