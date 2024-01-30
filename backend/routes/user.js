require("dotenv").config();
const router = require("express").Router();
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const signUpSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

// Method: POST
// Route: /api/v1/user/signup
router.post("/signup", async (req, res) => {
  const signupData = req.body;
  const validateSignupData = signUpSchema.safeParse(signupData);

  if (!validateSignupData.success) {
    return res.status(404).json({ message: "Invalid credentials" });
  }

  const userExists = await User.findOne({ username: signupData.username });

  if (userExists) {
    return res.status(404).json({ message: " Email already taken " });
  }

  const newUser = await User.create(signupData);
  if (!newUser) {
    return res.status(404).json({ message: "Failed to sign up " });
  }

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
  res.status(201).json({ message: "User created successfully", token });
});

// Method: POST
// Route: /api/v1/user/signin

router.post("/signin", async (req, res) => {
  const signInData = req.body;
  const validateSignIn = signInSchema.safeParse(signInData);
  if (!validateSignIn.success) {
    return res.status(404).json({ message: "Invalid credentials " });
  }

  const userExists = await User.findOne({ username: signInData.username });

  if (!userExists) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET);

  res.status(200).json({ token });
});

module.exports = router;
