"use client";
import React, { useState, useEffect } from 'react';
import axios from '@/utils/axios';
import { useLeadEnums } from '@/hooks/useLeadEnums';

const EditLeadForm = ({ leadId, onUpdate, leadData, onClose }) => {
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { data: enumsData } = useLeadEnums();

  useEffect(() => {
    if (leadData) {
      setFormData(leadData);
    }
  }, [leadData]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error message for the field being edited
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const formatDateForDisplay = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForBackend = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validatePhoneNumber = (value) => {
    const isValid = /^[0-9]{11}$/.test(value);
    return isValid || "Phone number must be exactly 11 digits and contain only numbers";
  };

  const validateBudget = (value) => {
    if (value === "" || value === undefined || value === null) return true;
    const isValid = !isNaN(value) && value >= 0;
    return isValid || "Budget must be a positive number";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneValidation = validatePhoneNumber(formData.phoneNumber);
    const budgetValidation = validateBudget(formData.budget);

    if (phoneValidation !== true) {
      setErrors({
        ...errors,
        phoneNumber: phoneValidation,
      });
      setErrorMessage("");
      return;
    }

    if (!formData.status) {
      setErrors({
        ...errors,
        status: "Status is required",
      });
      setErrorMessage("");
      return;
    }

    if (budgetValidation !== true) {
      setErrors({
        ...errors,
        budget: budgetValidation,
      });
      setErrorMessage("");
      return;
    }

    const formattedDate = formData.date ? formatDateForBackend(formData.date) : null;
    const updatedFormData = { ...formData, date: formattedDate };

    const hasChanges = Object.keys(updatedFormData).some(
      key => updatedFormData[key] !== leadData[key]
    );

    if (!hasChanges) {
      setErrorMessage("You need to update something.");
      setSuccessMessage("");
      return;
    }

    try {
      await axios.put(`/api/leads/${leadId}`, updatedFormData);
      setSuccessMessage("Lead updated successfully!");
      setErrorMessage("");
      if (onUpdate) {
        onUpdate(updatedFormData);
      }
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setSuccessMessage("");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 flex mt-2"> {/* Reduced top margin */}
      <div className="py-4 px-4 mx-auto max-w-xl lg:max-w-2xl w-1/3">
        <button
          onClick={onClose}
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-700"
        >
          Close
        </button>
      </div>
      <div className="py-4 px-4 mx-auto max-w-xl lg:max-w-2xl w-2/3"> {/* Reduced top padding */}
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Edit Lead
        </h2>
        <hr className="mb-2" />
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Lead Details
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Edit details such as name, phone number, date, and project.
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
                  value={formData.leadName || ''}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter lead name"
                />
              </div>
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date ? formatDateForDisplay(formData.date) : ''}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone:
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status:
              </label>
              <select
                name="status"
                id="status"
                value={formData.status || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select Status</option>
                {enumsData?.statuses?.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">
                  {errors.status}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Budget:
              </label>
              <input
                type="number"
                name="budget"
                id="budget"
                value={formData.budget || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter budget"
              />
              {errors.budget && (
                <p className="text-red-500 text-sm">
                  {errors.budget}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="project_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Project:
              </label>
              <select
                name="project_id"
                id="project_id"
                value={formData.project_id || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.project_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Update Lead"
            className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          />
        </form>
      </div>
    </section>
  );
};

export default EditLeadForm;
