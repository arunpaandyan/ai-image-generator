import express from "express";
import { generateImage } from "../controllers/dalleController.js";

const router = express.Router();

// AI Image Generating function
router.post("/", generateImage);

export default router;
