import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// Generate JWT Token
const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  console.log("refreshToken: ", refreshToken);
  console.log("accessToken: ", accessToken);

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
      return res.status(400, "email is required");
    }

    // find user
    const user = await User.findOne({ email });

    // find user is not exist
    if (!user) {
      return res.status(404, "User is not exist");
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

export default router;
