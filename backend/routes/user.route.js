import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controllers.js";

const router = express.Router();

// for register route || POST
router.post("/register", registerController);
// for login route || POST
router.post("/login", loginController);

// exporting file
export default router;
