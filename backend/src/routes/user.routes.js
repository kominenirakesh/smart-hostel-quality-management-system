import { Router } from "express";
import { registerUser,loginUser, getProfile } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = Router();
// const check = (req, res) => {
//     res.status(200).json({
//       success: true,
//       message: "Welcome Owner"
//     });
//   };
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile", verifyJWT, getProfile);
router.get(
  "/owner-test",
  verifyJWT,
  authorizeRoles("owner"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Owner"
    });
  }
);

export default router;