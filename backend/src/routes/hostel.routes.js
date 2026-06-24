import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createHostel
} from "../controllers/hostel.controller.js";

const router = Router();

router.post("/create",verifyJWT,authorizeRoles("owner"),createHostel);

export default router;