const { raw } = require("body-parser");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const { hashPasswordFn, comparePasswordFn } = require("../utils/helper/helper");
const { signUpSchema } = require("../utils/validationSchema/validationSchema");
const fs = require("fs");
const path = require("path");
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

    let originalFileName = "";
    let uniqueFileName = "";
    let filePath = "";
    if (payload.userImage) {
      const base64Data = payload.userImage.split(";base64,").pop(); //extract , ke bad ka actual data
      const imgBuffer = Buffer.from(base64Data, "base64"); // Create a buffer from the base64 string
      const extension = payload.userImage.split(";")[0].split("/")[1]; // image/png
      uniqueFileName = `userImage-${Date.now()}.${extension}`; // generate unique filename
      originalFileName = `userImage.${extension}`;
      // filePath = path.join(__dirname, "../uploads", uniqueFileName); // puri directory ka path
      filePath = path.join("uploads", uniqueFileName); // relative path
      fs.writeFileSync(filePath, imgBuffer); // Save the image to the server
    }

    const signUpData = {
      ...payload,
      password: hashedPassword,
      name: payload.username,
      role: payload.role || "user",
      created_by: payload.username,
      original_file_name: originalFileName,
      unique_file_name: uniqueFileName,
      file_path: filePath,
    };
    const newUser = await User.create(signUpData);
    const { password, ...userData } = newUser.toJSON(); // exclude password
    if (!newUser) {
      return res.status(500).json({ message: "Error creating user." });
    }
    const accessToken = jwt.sign(
      {
        user_id: newUser.id,
        user_name: newUser.name,
        user_email: newUser.email,
        user_role: newUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        user_id: newUser.id,
        user_name: newUser.name,
        user_email: newUser.email,
        user_role: newUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // https ke liye development me false
      sameSite: "lax", // CSRF protection strict -->sameSite: 'strict' frontend and backend same site pr ho
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      signed: false,
    });
    res.status(201).json({
      status: "Success",
      data: {
        userData,
        accessToken,
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.LogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    const existingUser = await User.findOne({
      where: { email },
      raw: true,
    });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    const isPasswordValid = await comparePasswordFn(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    // Generate tokens
    const accessToken = jwt.sign(
      {
        user_id: existingUser.id,
        user_name: existingUser.name,
        user_email: existingUser.email,
        user_role: existingUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        user_id: existingUser.id,
        user_name: existingUser.name,
        user_email: existingUser.email,
        user_role: existingUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // HTTPS ke liye true kar dena production me
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      status: "Success",
      message: "Login successfully",
      data: {
        accessToken,
        userData: existingUser,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

// logout
exports.LogOut = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // HTTPS ke liye true kar dena production me
      sameSite: "lax",
    });
    res.status(200).json({
      status: "Success",
      message: "Logout successful"
    });
  } catch (error) {
    next(error);    
  }
}