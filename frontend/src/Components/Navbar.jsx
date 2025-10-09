import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { Icons } from "../icons/icons";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  // const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { authenticatedUser, setAuthenticatedUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // smooth react-router redirect
  };

  return (
    <nav className="bg-blue-600 text-white px-10 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        <button className="text-2xl">
          <Icons.MdMenu />
        </button>
        <Link to="/" className="text-xl font-bold hover:text-gray-200">
          Mawai Infotech Ltd. -- Issue Log Management
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <span className="hover:text-gray-200">
            Welcome {authenticatedUser ? `, ${authenticatedUser.name}` : ""}
          </span>
          <span className="hover:text-gray-200">
            {authenticatedUser ? authenticatedUser.role : "Guest"}
          </span>
          <button
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
