import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";
import asyncHandler from "express-async-handler";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

const createPost = asyncHandler(async (req, res) => {
  try {
    const { name, prompt, photo, user } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    console.log(photoUrl.url);
    const newPost = await Post.create({
      user,
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    res.status(201).json({ success: false, data: error });
  }
});

export { getPosts, createPost };
