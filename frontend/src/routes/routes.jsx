import React from 'react'
import { createBrowserRouter } from "react-router";
import LogIn from "../Components/LogIn"

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {index:true, element: <LogIn/>}
    ]
  },
]);
export default router;
