import React from "react";
import { Link } from "react-router-dom";
import * as Fa from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-blue-900 text-white h-142 p-3 fixed left-0 top-14">
      <nav className="flex flex-col gap-4">
        <Link
          to="/home"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Fa.FaHome /> Home
        </Link>
        <Link
          to="/home/complaint-entry"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Fa.FaCog /> Complaint Entry
        </Link>
        <Link
          to="/home/issue-log-report"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Fa.FaList /> Issue Log Report
        </Link>
        <Link
          to="/home/complaint-mis"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Fa.FaFile /> Complaint Mis
        </Link>
        <Link
          to="/home/customer-contact"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Fa.FaFileAlt /> Customer Contact
        </Link>
      </nav>
    </aside>
  );
}
