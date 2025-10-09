import React, { Fragment } from "react";

const IssueLogCreation = () => {
  return (
    <Fragment>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 max-w-8xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Issue Log Creation</h2>

        <form className="space-y-0">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Project
              </label>
              <select
                name="project_name"
                id="project_name"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
              >
                <option value=""></option>
                <option value="Project A">Project A</option>
                <option value="Project B">Project B</option>
                <option value="Project C">Project C</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Unit
              </label>
              <input
                id="unit"
                type="text"
                name="unit"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Module
              </label>
              <select
                name="module_name"
                id="module_name"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="Module A">Module A</option>
                <option value="Module B">Module B</option>
                <option value="Module C">Module C</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tran Type
              </label>
              <select
                id="tran_type"
                name="tran_type"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="Type A">Type A</option>
                <option value="Type B">Type B</option>
                <option value="Type C">Type C</option>
              </select>
            </div>
          </div>

          {/* Add more rows here if needed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Module option name
              </label>
              <input
                type="text"
                name="module_opt_name"
                id="module_opt_name"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Problem Type
              </label>
              <select
                id="problem_type"
                name="problem_type"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="Type A">Error</option>
                <option value="Type B">Existing Change</option>
                <option value="Type C">New Requirement</option>
                <option value="Type B">Server Issue</option>
                <option value="Type C">Training</option>
                <option value="Type C">User Issue</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Report Date
              </label>
              <input
                type="date"
                name="report_date"
                id="report_date"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="Type A">High</option>
                <option value="Type B">Low</option>
                <option value="Type C">Medium</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                User Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Entry By
              </label>
              <input
                type="text"
                id="entry_by"
                name="entry_by"
                className="w-60 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Requirement Detail
              </label>
              <input
                type="text-area"
                name="requirement_detail"
                id="requirement_detail"
                className="w-100 h-30 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default IssueLogCreation;
