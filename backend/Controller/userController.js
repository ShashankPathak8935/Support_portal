const { raw } = require("body-parser");
const User = require("../Models/userModel");
// const catchAsync = require("../utils/catchAsync");

exports.SignUp = async (req, res, next) => {
  const payload = req.body;
  try {
    
    if (!payload.username || !payload.email || !payload.password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }
    const signUpData = {
      ...payload,
      name: payload.username,
      role: payload.role || "user",
      created_by: payload.username
    }
    const existingUser = await User.findOne({
      where: {email: payload.email}
    })
    if (existingUser) {
      return res.status(409).json({message: "This User already exists. please Login."})
    }
    const newUser = await User.create(signUpData);
    if (!newUser) {
      return res.status(500).json({ message: "Error creating user." });
    }
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

exports.LogIn = async (req, res, next) => {
  
  try {
    const { username, password } = req.body;
    if(!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
    const user = await User.findOne({
      where: { email: username },
      raw: true,
    }
    ); // Assuming username is email
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(error);
  }
};

