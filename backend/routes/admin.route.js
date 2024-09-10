import express from "express";
import {
  getAllUser,
  getAllDoctor,
  changeAccountStatus,
} from "../controllers/admin.controllers.js";
import { authMiddleware } from "../middelware/auth.middelware.js";
const router = express.Router();

// getall users || GET
router.get("/getAllUser", authMiddleware, getAllUser);

// get all doctor
router.get("/getAllDoctor", authMiddleware, getAllDoctor);

// change account status of doctor
router.post("/changeAccountStatus", authMiddleware, changeAccountStatus);
export default router;
