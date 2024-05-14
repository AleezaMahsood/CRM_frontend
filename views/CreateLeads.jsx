"use client";
import React, { useState, useEffect } from 'react';
import axios from "@/utils/axios";
import { useLeadEnums } from '@/hooks/useLeadEnums';

const CreateLeads = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
      project_id:null , // Storing the project ID directly
      // other form fields
  });


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

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const frmData = {
      leadName: formData.get("leadName"),
      phoneNumber: formData.get("phoneNumber"),
      project_id: formData.get("project_id"),
      campaign: formData.get("campaign"),
      budget: formData.get("budget"),
      lead_date: formData.get("date"),
      status: formData.get('status'), // corrected to match the input's name
    };

    console.log(frmData);
    axios.post("/api/leads", frmData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { data: enumsData } = useLeadEnums();

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            New Lead
          </h2>
          <hr className="mb-4" />
          <form
            method="post"
            action="#"
            onSubmit={submitForm}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Lead Details
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Add details such as name, phone number, date, and project.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    name="leadName"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter lead name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date:
                  </label>
                  <input
                    style={{ width: "100%" }}
                    type="date"
                    name="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="-----"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone:
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter phone number"
                    required
                  />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required>
                      <option value="" disabled selected>Select Status</option>
                  {enumsData?.statuses?.map(status => (
                    <option key={status} value={status}>{status}</option> 
                  ))}
                    </select>
                  

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
                  <label
                    htmlFor="campaign"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Campaign:
                  </label>
                  <input
                    type="text"
                    name="campaign"
                    id="campaign"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. 100,000,000"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Budget:
                  </label>
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. 10,000,000"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="project_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project:
                </label>
                <select
                  name="project_id"
                  id="project_id"
                  value={formData.project_id} 
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                   <option value="">Select Project</option>
                {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.project_name}</option>
                ))}
                </select>
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
    </>
  );
};
export default CreateLeads;
