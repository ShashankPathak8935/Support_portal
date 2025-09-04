const { raw } = require("body-parser");
const User = require("../Models/userModel");
// const catchAsync = require("../utils/catchAsync");

exports.SignUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }
    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "user",
      created_by: name,
    });
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
  console.log("Login request body:", req.body);
  try {
    const { username, password } = req.body; // Adjusted to match frontend keys
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

