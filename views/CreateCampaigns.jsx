"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CampaignForm = () => {
  const { register, handleSubmit, setError, clearErrors, formState: { errors }, getValues, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateCampaignName = async (campaign_name) => {
    try {
      const response = await axios.post("http://localhost:8000/api/campaigns/check-campaign-name", { campaign_name });
      if (response.data.exists) {
        setError("campaign_name", {
          type: "manual",
          message: "campaign name already exists",
        });
        return false;
      }
      clearErrors("campaign_name");
      return true;
    } catch (error) {
      setError("campaign_name", {
        type: "manual",
        message: "Error checking campaign name uniqueness",
      });
      return false;
    }
  };

  const validateNumber = (value) => {
    const isNumber = !isNaN(value) && value > 0;
    return isNumber || "Value must be a positive number";
  };

  const onSubmit = async (formData) => {
    const isCampaignNameValid = await validateCampaignName(formData.campaign_name);

    if (isCampaignNameValid) {
      try {
        const response = await axios.post("http://localhost:8000/api/campaigns", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      setSuccessMessage("Campaign created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        reset();
      }, 3000);
    }  catch (error) {
          console.error('Error creating campaign:', error);
           setErrorMessage(error.response?.data?.message || "An error occurred.");
           setTimeout(() => {
           setErrorMessage("");
      },   3000);
    }
  }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          New Campaign
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Campaign Details
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Add details such as title and description so it is easy to distinguish between one or more campaigns.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="campaign_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="campaign_name"
                  id="campaign_name"
                  {...register("campaign_name", {
                    required: "Campaign name is required",
                    maxLength: {
                      value: 150,
                      message: "Campaign Name cannot exceed 150 characters",
                    },
                   
                  })}
                  className={`bg-gray-50 border ${errors.campaign_name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Enter campaign name"
                />
                {errors.campaign_name && (
                  <p className="text-red-500 text-sm">{errors.campaign_name.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description:
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 255,
                      message: "Description cannot exceed 255 characters",
                    },
                  })}
                  className={`bg-gray-50 border ${errors.description ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Enter campaign description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Campaign Duration
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Add details such as title and description so it is easy to distinguish between one or more campaigns.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative w-full">
                <label
                  htmlFor="start_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date:
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  {...register("start_date")}
                  className={`bg-gray-50 border ${errors.start_date ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="end_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Date:
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  {...register("end_date", {
                    validate: (value) => {
                      const startDate = getValues("start_date");
                      return value >= startDate || "End date must be after start date";
                    },
                  })}
                  className={`bg-gray-50 border ${errors.end_date ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm">{errors.end_date.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Campaign Budget
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Select budget for this campaign. This can be used to determine how well the campaign is performing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="expected_revenue"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Expected Revenue:
                </label>
                <input
                  type="number"
                  name="expected_revenue"
                  id="expected_revenue"
                  {...register("expected_revenue", {
                    required: "Expected revenue is required",
                    validate: validateNumber,
                  })}
                  className={`bg-gray-50 border ${errors.expected_revenue ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="e.g:100000000"
                />
                {errors.expected_revenue && (
                  <p className="text-red-500 text-sm">{errors.expected_revenue.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="actual_cost"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Actual Cost:
                </label>
                <input
                  type="number"
                  name="actual_cost"
                  id="actual_cost"
                  {...register("actual_cost", {
                    required: "Actual cost is required",
                    validate: validateNumber,
                  })}
                  className={`bg-gray-50 border ${errors.actual_cost ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="e.g:10000000"
                />
                {errors.actual_cost && (
                  <p className="text-red-500 text-sm">{errors.actual_cost.message}</p>
                )}
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="Add Campaign"
            className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6"
          />
        </form>
      </div>
    </section>
  );
};

export default CampaignForm;
