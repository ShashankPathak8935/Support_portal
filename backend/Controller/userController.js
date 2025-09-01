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
