import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../mongodb/models/user.js";
import asyncHandler from "express-async-handler";

// @desc  Register new user
// @route POST /api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add required fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      subscription: user.subscription,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Authenticate a user
// @route POST /api/users/login
// access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      subscription: user.subscription,
    });
  } else {
    res.status(400);
    throw new Error("Invalid creantials");
  }
});

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//Generate Jwt

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

export { registerUser, loginUser, getMe };
