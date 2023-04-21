import express from "express";
import {
  registerUser,
  getMe,
  loginUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("file"), registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
