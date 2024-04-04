"use client";
import React from "react";
import useProject from "@/hooks/useProject";
import axios from "@/utils/axios";

const CreateProject = () => {
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const frmData = {
      project_name: formData.get("project_name"), // Name of the project
      project_location: formData.get("project_location"), // location of the project
      project_type: formData.get("project_type"), // type of the project
      min_price: formData.get("min_price"), // minimum price of the project
      max_price: formData.get("max_price"), // maximum price of the project
    };

    console.log(frmData);
    axios.post("/api/projects", frmData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Add Project
        </h2>
        <hr className="mb-4" />
        <form onSubmit={submitForm}
        method='POST' action ='#'>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Project Details
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Add details such as Name, Location, and Type so it is easy to
              distinguish between one or more Projects.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="project_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="project_name"
                  id="project_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Project Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="project_location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location:
                </label>
                <select
                  id="project_location"
                  name="project_location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">--Select Location--</option>
                  <option value="lahore">Lahore</option>
                  <option value="karachi">Karachi</option>
                  <option value="quetta">Quetta</option>
                  <option value="rawalpindi">Rawalpindi</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="project_type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type:
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">--Select Type--</option>
                  <option value="environmental">Environmental Project</option>
                  <option value="healthcare">Healthcare Project</option>
                  <option value="IT">Information Technology Project</option>
                  <option value="event_management">
                    Event Management Project
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Project Cost
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Select Price for this project. This can be used to determine how
              well the project is performing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="min_price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Minimum Price:
                </label>
                <input
                  type="text"
                  name="min_price"
                  id="min_price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="e.g:100,000,000"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="max_price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Maximum Price:
                </label>
                <input
                  type="text"
                  name="max_price"
                  id="max_price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="e.g:10,000,000"
                  required
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Add Project"
            className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6"
          />
        </form>
      </div>
    </section>
  );
};

export default CreateProject;
