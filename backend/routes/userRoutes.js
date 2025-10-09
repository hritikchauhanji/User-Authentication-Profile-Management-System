import express from "express";
import { User } from "../models/User.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// file filter for multer
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary upload
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfull
    // console.log("file is uplaoded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload error:", error.message);
    return null;
  }
};

// Generate JWT Token
const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken };
};

// Registration router
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validataion - not empty
    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists: email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const createdUser = await User.create({
      name,
      password,
      email,
    });

    // check for user creation
    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering the user" });
    }

    res.status(200).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      //   password: createdUser.password,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login router
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // if email is required
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    // find user
    const user = await User.findOne({ email });

    // find user is not exist
    if (!user) {
      return res.status(404).json({ message: "User is not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    // check password valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    const { accessToken } = await generateAccessTokenAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.name,
      profileImage: user.profileImage,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Profiile
router.get("/profile", verifyJWT, async (req, res) => {
  res.json(req.user);
});

// Update Profile
router.put("/profile", verifyJWT, async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        name,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Upload Profile Image
router.post(
  "/upload",
  verifyJWT,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const profileImageLocalPath = req.file?.path;

      if (!profileImageLocalPath) {
        return res.status(400, "Profile local path not found");
      }

      const profileImage = await uploadOnCloudinary(profileImageLocalPath);

      console.log(profileImage.url);

      if (!profileImage.url) {
        return res.status(400, "Error while uploading on profileImage");
      }

      user.profileImage = profileImage.url;
      await user.save();

      res.json({
        message: "Image uploaded successfully",
        profileImage: user.profileImage,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
