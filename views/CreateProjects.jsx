"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useProject from "@/hooks/useProject";
import { useProjectEnums } from "@/hooks/useProjectEnums";
import axios from "@/utils/axios";

const CreateProject = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { data: enumsData } = useProjectEnums();
  const { register, handleSubmit, formState: { errors }, reset, getValues, setError, clearErrors } = useForm();

  const validateProjectName = async (project_name) => {
    try {
      const response = await axios.post("/api/projects/check-project-name", { project_name });
      if (response.data.exists) {
        setError("project_name", {
          type: "manual",
          message: "Project name already exists",
        });
        return false;
      }
      clearErrors("project_name");
      return true;
    } catch (error) {
      setError("project_name", {
        type: "manual",
        message: "Error checking project name uniqueness",
      });
      return false;
    }
  };
  const validateNumber = (value) => {
    const isNumber = !isNaN(value) && value > 0;
    return isNumber || "Value must be a positive number";
  };

  const onSubmit = async (formData) => {
    const isProjectNameValid = await validateProjectName(formData.project_name);

    if (isProjectNameValid) {
      try {
        const response = await axios.post("/api/projects", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSuccessMessage("Project created successfully!");

        // Clear success message and reset form fields after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
          reset();
        }, 3000);
      } catch (error) {
        setError("submit", {
          type: "manual",
          message: error.response?.data?.message || "An error occurred.",
        });
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Add Project
        </h2>
        <hr className="mb-4" />
        {successMessage && (
          <div className="mb-4 p-4 bg-gray-100 border-l-4 border-green-500 text-green-700">
            {successMessage}
          </div>
        )}
        {errors.submit && (
          <div className="mb-4 p-4 bg-gray-100 border-l-4 border-red-500 text-red-700">
            {errors.submit.message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("project_name", {
                    required: "Project name is required",
                    maxLength: {
                      value: 150,
                      message: "Project Name cannot exceed 150 characters",
                    },
                  })}
                  className={`bg-gray-50 border ${errors.project_name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Enter Project Name"
                />
                {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name.message}</p>}
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
                  {...register("project_location", {
                    required: "Location is required",
                  })}
                  className={`bg-gray-50 border ${errors.project_location ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">
                    Select Location
                  </option>
                  {enumsData?.project_locations?.map((project_location) => (
                    <option key={project_location} value={project_location}>
                      {project_location}
                    </option>
                  ))}
                </select>
                {errors.project_location && <p className="text-red-500 text-sm">{errors.project_location.message}</p>}
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
                  {...register("project_type", {
                    required: "Type is required",
                  })}
                  className={`bg-gray-50 border ${errors.project_type ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="" >
                    Select Project Type
                  </option>
                  {enumsData?.project_types?.map((project_type) => (
                    <option key={project_type} value={project_type}>
                      {project_type}
                    </option>
                  ))}
                </select>
                {errors.project_type && <p className="text-red-500 text-sm">{errors.project_type.message}</p>}
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
                  type="number"
                  name="min_price"
                  id="min_price"
                  {...register("min_price", {
                    required: "Minimum price is required",
                    validate: validateNumber,
                  })}
                  className={`bg-gray-50 border ${errors.min_price ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="e.g:10000"
                />
                {errors.min_price && <p className="text-red-500 text-sm">{errors.min_price.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="max_price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Maximum Price:
                </label>
                <input
                  type="number"
                  name="max_price"
                  id="max_price"
                  {...register("max_price", {
                    required: "Maximum price is required",
                    validate: validateNumber,
                    validate: (value) => {
                      const minPrice = getValues("min_price");
                      return parseInt(value) > parseInt(minPrice) || "Maximum price must be greater than minimum price";
                    },
                  })}
                  className={`bg-gray-50 border ${errors.max_price ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="e.g:10000"
                />
                {errors.max_price && <p className="text-red-500 text-sm">{errors.max_price.message}</p>}
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
