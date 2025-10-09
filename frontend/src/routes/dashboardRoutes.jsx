import React from "react";
import Home from "../Components/Home";
import DashboardLayout from "../Components/DashboardLayout";
import ComplaintEntry from "../Components/allforms/complaintEntry/ComplaintEntry";

const dashboardRoutes = [
  {
    path: "/home",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "complaint-entry", element: <ComplaintEntry /> },
    ],
  }, // ✅ relative path, nested under ProtectedRoute
];

export default dashboardRoutes;
