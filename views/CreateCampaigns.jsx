"use client";
import React, { useState } from "react";
import useCampaign from "@/hooks/useCampaign";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "@/utils/axios";
import { Noto_Sans_Tamil_Supplement } from "next/font/google";

const CreateCampaign = () => {
  const [start_date, setstart_date] = useState(null);
  const [end_date, setend_date] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const frmData = {
      campaign_name: formData.get("campaign_name"), // Name of the Campaign
      description: formData.get("description"), //Description of the project
      start_date: start_date ? start_date.toISOString().split('T')[0] : null, // Start date of campaign
      end_date: end_date ? end_date.toISOString().split('T')[0] : null,// End Date of the campaign
      expected_revenue: formData.get("expected_revenue"), //Expected revenue for this campaign
      actual_cost: formData.get("actual_cost"), // Actual Cost for this campaign
    };

    console.log(frmData);
    axios.post("/api/campaigns", frmData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          New Campaign
        </h2>
        <hr className="mb-4" />
        <form
          action="#"
          method="POST"
          onSubmit={submitForm}
          className="space-y-6"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Campaign Details
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Add details such as title and description so it is easy to
              distinguish between one or more campaigns.
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter campaign name"
                  required
                />
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter campaign description"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Campaign Duration
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Add details such as title and description so it is easy to
              distinguish between one or more campaigns.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative w-full">
                <label
                  htmlFor="start_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date:
                </label>
                <div className="relative w-full">
                  <DatePicker
                    id="start_date"
                    selected={start_date}
                    onChange={(date) => setstart_date(date)}
                    dateFormat="yyyy/MM/dd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 py-3 pl-10 pr-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholderText="yyyy/mm/dd"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="end_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Date:
                </label>
                <div className="relative w-full">
                  <DatePicker
                    id="end_date"
                    selected={end_date}
                    onChange={(date) => setend_date(date)}
                    dateFormat="yyyy/MM/dd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 py-3 pl-10 pr-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholderText="yyyy/mm/dd"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Campaign Budget
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Select budget for this campaign. This can be used to determine how
              well the campaign is performing.
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
                  type="text"
                  name="expected_revenue"
                  id="expected_revenue"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="e.g:100,000,000"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="actual_cost"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Actual Cost:
                </label>
                <input
                  type="text"
                  name="actual_cost"
                  id="actual_cost"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="e.g:10,000,000"
                  required
                />
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

export default CreateCampaign;
