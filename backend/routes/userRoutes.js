import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

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
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
