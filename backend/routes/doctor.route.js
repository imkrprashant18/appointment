import express from "express";
import { authMiddleware } from "../middelware/auth.middelware.js";
import {
  getDoctorInfoController,
  getDoctorById,
} from "../controllers/doctor.controllers.js";

const router = express.Router();

// get single doctor info || POST
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);
// // update doctor profile || POST
// router.post("/updateProfile", authMiddleware, updateDoctorProfile);

// get doctor by id || POST
router.get("/getDoctorById", authMiddleware, getDoctorById);
export default router;
