import React from "react";
import LogIn from "../Components/LogIn";
import SignUp from "../Components/SignUp";

const authRoutes = [
  { index: true, element: <LogIn /> },
  { path: "signup", element: <SignUp /> },
];

export default authRoutes;
