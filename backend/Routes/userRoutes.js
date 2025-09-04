const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const userController = require("../Controller/userController");

// Define your user-related routes here
router.post("/signup", userController.SignUp);
router.post("/login", userController.LogIn);
// router.get("/users", userController.getAllUsers);
// router.get("/users/:id", userController.getUserById);
// router.put("/users/:id", userController.updateUser);
// router.delete("/users/:id", userController.deleteUser);



module.exports = router;