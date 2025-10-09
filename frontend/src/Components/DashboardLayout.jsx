import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Siderbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-grow container mx-auto px-4 py-6 pt-20 ml-60">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
