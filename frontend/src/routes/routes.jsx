import React from 'react'
import { createBrowserRouter } from "react-router";
import LogIn from "../Components/LogIn";
import SignUp from '../Components/SignUp';
import Home from '../Components/Home';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <LogIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/home", element: <Home /> },
    ],
  },
]);
export default router;
