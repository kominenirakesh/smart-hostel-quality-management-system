import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createHostel,joinHostel,assignSupervisor
} from "../controllers/hostel.controller.js";

const router = Router();

router.post("/create",verifyJWT,authorizeRoles("owner"),createHostel);
router.post("/join",verifyJWT,authorizeRoles("student"),joinHostel);
router.patch( "/:hostelId/assign-supervisor",verifyJWT,authorizeRoles("owner"),assignSupervisor);

export default router;