"use client";
import React, { useState, useEffect } from 'react';
import axios from '@/utils/axios';
import { useLeadEnums } from '@/hooks/useLeadEnums';

const EditLeadForm = ({ leadId, onUpdate, leadData, onClose }) => {
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const { data: enumsData, isLoading: enumsLoading, error: enumsError } = useLeadEnums();

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDateForDisplay = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = (dateObj.getDate()+1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForBackend = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = (dateObj.getDate()+1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = formData.date ? formatDateForBackend(formData.date) : null;
      const updatedFormData = { ...formData, date: formattedDate };
      await axios.put(`/api/leads/${leadId}`, updatedFormData);
      if (onUpdate) {
        onUpdate(updatedFormData);
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Lead</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Name:
          </label>
          <input
            type="text"
            name="leadName"
            id="leadName"
            value={formData.leadName || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
            placeholder="Enter lead name"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
            Phone:
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phone"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
            placeholder="Enter phone number"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900">
            Budget:
          </label>
          <input
            type="number"
            name="budget"
            id="budget"
            value={formData.budget || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
            placeholder="Enter budget"
          />
        </div>
        <div>
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
            Status:
          </label>
          <select
            name="status"
            id="status"
            value={formData.status || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
          >
            <option value="" >Select Status</option>
            {enumsData?.statuses?.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">
            Date:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date ? formatDateForDisplay(formData.date) : ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
          />
        </div>
        <div>
          <label htmlFor="project_id" className="block mb-2 text-sm font-medium text-gray-900">
            Project:
          </label>
          <select
            name="project_id"
            id="project_id"
            value={formData.project_id || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
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
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Update Lead
        </button>
      </div>
    </form>
  );
};

export default EditLeadForm;
