const { raw } = require("body-parser");
const User = require("../Models/userModel");
const { hashPasswordFn, comparePasswordFn } = require("../utils/helper/helper");
const { signUpSchema } = require("../utils/validationSchema/validationSchema");
// const catchAsync = require("../utils/catchAsync");

exports.SignUp = async (req, res, next) => {
  const payload = req.body;
  try {
    // Yup validation--> u can also use yup validation here
    // await signUpSchema.validate(payload, { abortEarly: false });

    if (!payload.username || !payload.email || !payload.password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }
    if (payload.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    const existingUser = await User.findOne({
      where: { email: payload.email },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "This User already exists. please Login." });
    }
    const hashedPassword = await hashPasswordFn(payload.password);

    const signUpData = {
      ...payload,
      password: hashedPassword,
      name: payload.username,
      role: payload.role || "user",
      created_by: payload.username,
    };
    const newUser = await User.create(signUpData);
    const { password, ...userData } = newUser.toJSON(); // exclude password
    if (!newUser) {
      return res.status(500).json({ message: "Error creating user." });
    }
    const token = jwt.sign(
      {
        user_id: newUser.id,
        user_name: newUser.name,
        user_email: newUser.email,
        user_role: newUser.role,
      },
      process.env.JWT_SECRET_KEY,
      {expiresIn: "7d"}
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: userData });
  } catch (error) {
    next(error);
  }
};

exports.LogIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }
    const user = await User.findOne({
      where: { email: username },
      raw: true,
    }); // Assuming username is email
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(error);
  }
};
