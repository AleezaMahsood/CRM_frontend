"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "@/utils/axios";
import { useLeadEnums } from "@/hooks/useLeadEnums";

const CreateLeads = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/auth/me", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((userData) => {
        setUserId(userData.id);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const submitForm = async (formData) => {
    formData.user_id = userId;
    formData.created_by = userId;

    try {
      const response = await axios.post("/api/leads", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage("Lead created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        reset();
      }, 3000);
    } catch (error) {
      console.error("Error creating lead:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const { data: enumsData } = useLeadEnums();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          New Lead
        </h2>
        <hr className="mb-4" />
        {successMessage && (
          <div className="mb-4 p-4 bg-gray-100 border-l-4 border-green-500 text-green-700">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 bg-gray-100 border-l-4 border-red-500 text-red-700">
            {errorMessage}
          </div>
        )}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-6">
          
          <form
            onSubmit={handleSubmit(submitForm)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label
                htmlFor="leadName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lead Name:
              </label>
              <input
                type="text"
                name="leadName"
                id="leadName"
                {...register("leadName", {
                  required: "Lead Name is required",
                  maxLength: { value: 255, message: "Max length is 255" },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Lead name can only contain letters and spaces",
                  },
                })}
                className={`bg-gray-50 border ${
                  errors.leadName ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter lead name"
              />
              {errors.leadName && (
                <p className="text-red-500 text-sm">
                  {errors.leadName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="job_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Job Title:
              </label>
              <input
                type="text"
                name="job_title"
                id="job_title"
                {...register("job_title", {
                  maxLength: { value: 255, message: "Max length is 255" },
                })}
                className={`bg-gray-50 border ${
                  errors.job_title ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter job title"
              />
              {errors.job_title && (
                <p className="text-red-500 text-sm">
                  {errors.job_title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number:
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  maxLength: { value: 255, message: "Max length is 255" },
                  pattern: {
                    value: /^\d{11}$/,
                    message: "Phone number must be exactly 11 digits",
                  },
                })}
                className={`bg-gray-50 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile:
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                {...register("mobile", {
                  maxLength: { value: 255, message: "Max length is 255" },
                })}
                className={`bg-gray-50 border ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter mobile number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="whatsapp"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                WhatsApp:
              </label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                {...register("whatsapp", {
                  maxLength: { value: 255, message: "Max length is 255" },
                })}
                className={`bg-gray-50 border ${
                  errors.whatsapp ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter WhatsApp number"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="source"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source:
              </label>
              <input
                type="text"
                name="source"
                id="source"
                {...register("source", {
                  maxLength: { value: 255, message: "Max length is 255" },
                })}
                className={`bg-gray-50 border ${
                  errors.source ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter source"
              />
              {errors.source && (
                <p className="text-red-500 text-sm">{errors.source.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                {...register("email", {
                  maxLength: { value: 255, message: "Max length is 255" },
                })}
                className={`bg-gray-50 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company:
              </label>
              <input
                type="text"
                name="company"
                id="company"
                {...register("company", {
                  maxLength: { value: 255, message: "Max length is 255" },
                })}
                className={`bg-gray-50 border ${
                  errors.company ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter company"
              />
              {errors.company && (
                <p className="text-red-500 text-sm">{errors.company.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="projects"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Projects:
              </label>
              <select
                name="project_id"
                id="project_id"
                {...register("project_id")}
                className={`bg-gray-50 border ${
                  errors.project_id ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.project_name}
                  </option>
                ))}
              </select>
              {errors.project_id && (
                <p className="text-red-500 text-sm">
                  {errors.project_id.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status:
              </label>
              <select
                name="status"
                id="status"
                {...register("status", { required: "Status is required" })}
                className={`bg-gray-50 border ${
                  errors.status ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              >
                \<option value="">Select Status</option>
                {enumsData?.statuses?.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date:
              </label>
              <input
                type="date"
                name="date"
                id="date"
                {...register("date")}
                className={`bg-gray-50 border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Select date"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="fax"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fax:
              </label>
              <input
                type="text"
                name="fax"
                id="fax"
                {...register("fax")}
                className={`bg-gray-50 border ${
                  errors.fax ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter fax number"
              />
              {errors.fax && (
                <p className="text-red-500 text-sm">{errors.fax.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="revenue"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Revenue:
              </label>
              <input
                type="number"
                name="revenue"
                id="revenue"
                
                {...register("revenue", {
                  validate: value => {
                    if (value === "" || isNaN(parseFloat(value))) {
                      return true; // Allow empty or non-numeric values
                    } else {
                      return parseFloat(value) >= 0 || "Value must be a positive number";
                    }
                  }
                })}
                className={`bg-gray-50 border ${
                  errors.revenue ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter revenue"
              />
              {errors.revenue && (
                <p className="text-red-500 text-sm">{errors.revenue.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Budget:
              </label>
              <input
                type="number"
                name="budget"
                id="budget"
                {...register("budget", {
                  validate: value => {
                    if (value === "" || isNaN(parseFloat(value))) {
                      return true; // Allow empty or non-numeric values
                    } else {
                      return parseFloat(value) >= 0 || "Value must be a positive number";
                    }
                  }
                })}
                className={`bg-gray-50 border ${
                  errors.budget ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter budget"
              />
              {errors.budget && (
                <p className="text-red-500 text-sm">{errors.budget.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="skype"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Skype:
              </label>
              <input
                type="text"
                name="skype"
                id="skype"
                {...register("skype", { maxLength: 255 })}
                className={`bg-gray-50 border ${
                  errors.skype ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter Skype ID"
              />
              {errors.skype && (
                <p className="text-red-500 text-sm">{errors.skype.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="industry"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Industry:
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                {...register("industry", { maxLength: 255 })}
                className={`bg-gray-50 border ${
                  errors.industry ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter industry"
              />
              {errors.industry && (
                <p className="text-red-500 text-sm">
                  {errors.industry.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="employees"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Employees:
              </label>
              <input
                type="number"
                name="employees"
                id="employees"
                {...register("employees", { min: 0 })}
                className={`bg-gray-50 border ${
                  errors.employees ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter number of employees"
              />
              {errors.employees && (
                <p className="text-red-500 text-sm">
                  {errors.employees.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Rating:
              </label>
              <input
                type="text"
                name="rating"
                id="rating"
                {...register("rating", { maxLength: 100 })}
                className={`bg-gray-50 border ${
                  errors.rating ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter rating"
              />
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="remarks"
                className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
              >
                Remarks:
              </label>
              <textarea
                name="remarks"
                id="remarks"
                {...register("remarks")}
                className={`bg-gray-50 border ${
                  errors.remarks ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter remarks"
                rows="4"
              />
              {errors.remarks && (
                <p className="text-red-500 text-sm">{errors.remarks.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <input
                type="submit"
                value="Add Lead"
                className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateLeads;
