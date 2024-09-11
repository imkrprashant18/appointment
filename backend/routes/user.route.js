import express from "express";
import {
  loginController,
  registerController,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
  getAllDoctorController,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middelware/auth.middelware.js";

const router = express.Router();

// for register route || POST
router.post("/register", registerController);
// for login route || POST
router.post("/login", loginController);

// getuser  data || POst
router.post("/getUserData", authMiddleware, authController);
// apply for doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctor);
// get all notification || POST
router.post("/get-all-notification", authMiddleware, getAllNotification);
// delete all notification || POST
router.post("/delete-all-notification", authMiddleware, deleteAllNotification);
// GET ALL DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorController);
// exporting file
export default router;
