require("dotenv").config();
const router = require("express").Router();
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const authMiddleware = require("../middlewares/authMiddleware");
const Account = require("../models/accounts.models");

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
const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
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

  const randomBalance = Math.floor(Math.random() * 10000) + 1;

  const accountExists = await Account.create({
    user: newUser._id,
    balance: randomBalance,
  });

  if (!accountExists) {
    return res.status(404).json({ message: "Failed to create account " });
  }

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

// Method: PUT
// Route: /api/v1/user

router.put("/", authMiddleware, async (req, res) => {
  const newUserDetails = req.body;
  const validateNewUserDetails = updateUserSchema.safeParse(newUserDetails);
  if (!validateNewUserDetails.success) {
    return res.status(404).json({ message: "Invalid credentials" });
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.userId },
    newUserDetails
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "couldn't update user details" });
  }

  res.status(200).json({ message: "User details updated successfully" });
});

// Method: GET
// Route: /api/v1/user/bulk
// Query Parameter: ?filter=harkirat

router.get("/bulk", authMiddleware, async (req, res) => {
  const { filter } = req.query;
  const querySchema = z.string();
  const validateQuery = querySchema.safeParse(filter);
  if (!validateQuery.success) {
    return res.status(404).json({ message: "Invalid search" });
  }

  // const userToSendMoney = await User.find({
  //   $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  // }).select("-password ");
  const currentUser = req.userId;
  const userToSendMoney = await User.find({
    _id: { $ne: currentUser }, // Exclude the current user
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  }).select("-password");

  if (!userToSendMoney) {
    return res.status(404).json({ message: "No user found" });
  }

  res.json({ user: userToSendMoney });
});

module.exports = router;
