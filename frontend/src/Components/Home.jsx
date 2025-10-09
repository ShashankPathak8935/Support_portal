import React, { Fragment } from "react";
import * as Fa from "react-icons/fa";
import { Link } from "react-router-dom";
import HomeIndexComplaintStatusSummery from "./allforms/HomeIndexComplaintStatusSummery";
import HomeIndexClientConfirmationPending from "./allforms/HomeIndexClientConfirmationPending";

function Home() {
  return (
    <Fragment>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* Top header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-normal">Home</h2>
          <Link to="/complaint-entry">
            <button className="flex items-center gap-2 bg-blue-700 text-white px-1 py-1 rounded hover:bg-blue-700 transition">
              New Complaint
              <Fa.FaPlus />
            </button>
          </Link>
        </div>
      </div>
      <div className="flex gap-6 mt-1">
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col">
          <HomeIndexComplaintStatusSummery />
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col">
          <HomeIndexClientConfirmationPending />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
