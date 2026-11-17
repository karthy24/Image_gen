import Post from "../models/posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Configure Cloudinary only if credentials exist
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

// Create Post (Crash-proof: saves to MongoDB directly if Cloudinary isn't set up)
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;

    if (!name || !prompt || !photo) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let finalPhotoUrl = photo;

    // Try Cloudinary if keys exist; if it fails or keys are missing, keep original photo
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      try {
        const photoUrl = await cloudinary.uploader.upload(photo);
        if (photoUrl?.secure_url) {
          finalPhotoUrl = photoUrl.secure_url;
        }
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, storing image directly in MongoDB:", cloudErr.message);
      }
    }

    // Save directly to MongoDB
    const newPost = await Post.create({
      name,
      prompt,
      photo: finalPhotoUrl,
    });

    console.log(" Post saved to MongoDB successfully!");
    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post in DB:", error);
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error?.message || "Failed to create post"
      )
    );
  }
};