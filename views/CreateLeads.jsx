"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from "@/utils/axios";
import { useLeadEnums } from '@/hooks/useLeadEnums';
import RootLayout from '@/app/layout';

const CreateLeads = () => {
  const { register, handleSubmit, setError, formState: { errors }, reset, getValues } = useForm();
  const [projects, setProjects] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
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
        const response = await axios.get('http://localhost:8000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchProjects();
    fetchCampaigns();
  }, []);

  const validateNumber = (value) => {
    if (value === "" || value === undefined || value === null) return true;
    const isNumber = !isNaN(value) && value > 0;
    return isNumber || "Value must be a positive number";
  };

 

  const submitForm = async (formData) => {
    formData.created_by = userId;
    console.log('Form Data:', formData);


    
      try {
        const response = await axios.post("/api/leads/admin", formData, {
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
        console.error('Error creating lead:', error);
        setErrorMessage(error.response?.data?.message || "An error occurred.");
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
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Lead Details
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Add details such as name, phone number, date, and project.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leadName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name:
                </label>
                <input
                  type="text"
                  name="leadName"
                  id="leadName"
                  {...register("leadName", {
                    required: "Lead name is required",
                    maxLength: {
                      value: 255,
                      message: "Lead name cannot exceed 255 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Lead name can only contain letters and spaces",
                    },
                  })}
                  className={`bg-gray-50 border ${errors.leadName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Enter lead name"
                />
                {errors.leadName && (
                  <p className="text-red-500 text-sm">{errors.leadName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  {...register("date")}
                  className={`bg-gray-50 border ${errors.date ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    maxLength: {
                      value: 11,
                      message: "Phone number must be exactly 11 digits",
                    },
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Phone number must be a valid number",
                    },
                  })}
                  className={`bg-gray-50 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status:
                </label>
                <select
                  name="status"
                  id="status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                  className={`bg-gray-50 border ${errors.status ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="" >Select Status</option>
                  {enumsData?.statuses?.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Lead Campaign
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Select campaign for the lead. This section is optional.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label htmlFor="campaign_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Campaign:
                </label>
                <select
                  name="campaign_id"
                  id="campaign_id"
                  {...register("campaign_id")}
                  className={`bg-gray-50 border ${errors.campaign_id ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">Select Campaign</option>
                  {campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>{campaign.campaign_name}</option>
                  ))}
                </select>
                {errors.campaign_id && (
                  <p className="text-red-500 text-sm">{errors.campaign_id.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Budget:
                </label>
                <input
                  type="number"
                  name="budget"
                  id="budget"
                  {...register("budget", {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Budget must be a numeric value",
                    },
                    validate: validateNumber,
                  })}
                  className={`bg-gray-50 border ${errors.budget ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Enter budget"
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm">{errors.budget.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="project_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Project:
              </label>
              <select
                name="project_id"
                id="project_id"
                {...register("project_id")}
                className={`bg-gray-50 border ${errors.project_id ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.project_name}</option>
                ))}
              </select>
              {errors.project_id && (
                <p className="text-red-500 text-sm">{errors.project_id.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
          <input
            type="submit"
            value="Add Lead"
            className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          />
        </form>
      </div>
    </section>
  );
};

export default CreateLeads;
