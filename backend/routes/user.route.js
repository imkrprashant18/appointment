import express from "express";
import {
  loginController,
  registerController,
  authController,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middelware/auth.middelware.js";

const router = express.Router();

// for register route || POST
router.post("/register", registerController);
// for login route || POST
router.post("/login", loginController);

// getuser  data || POst
router.post("/getUserData", authMiddleware, authController);

// exporting file
export default router;
