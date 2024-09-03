import express from "express";
import { registerController } from "../controllers/user.controllers.js";

const router = express.Router();

// for register route
router.post("/register", registerController);

// exporting file
export default router;
