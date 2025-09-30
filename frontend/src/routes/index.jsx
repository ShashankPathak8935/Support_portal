import React from "react";
import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFound from "../Components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      ...authRoutes,
      {
        element: <ProtectedRoute />,
        children: [...dashboardRoutes],
      },
      {
        path: "*",
        element: <NotFound/>,
      },
    ],
  },
]);

export default router;
