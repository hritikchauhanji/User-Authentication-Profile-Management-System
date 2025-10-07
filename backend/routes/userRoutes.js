import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

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

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: email.name,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
