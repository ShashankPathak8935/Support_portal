import React from "react";
import Home from "../Components/Home";

const dashboardRoutes = [
  { path:"home", element: <Home /> }, // ✅ relative path, nested under ProtectedRoute
];

export default dashboardRoutes;
