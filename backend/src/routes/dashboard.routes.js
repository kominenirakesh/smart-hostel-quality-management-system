import { Router } from "express";
import { getOwnerDashboard } from "../controllers/dashboard.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = Router();

router.get("/owner",verifyJWT, authorizeRoles("owner"),getOwnerDashboard);

export default router;