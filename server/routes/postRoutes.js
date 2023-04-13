import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getPosts, createPost } from "../controllers/postController.js";

const router = express.Router();

//Get All posts
router.get("/", protect, getPosts);

//Create posts
router.post("/", protect, createPost);

export default router;
