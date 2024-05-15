"use client";
import React, { useState, useEffect } from 'react';
import useLeads from "@/hooks/useLeads";
import { useLeadEnums } from '@/hooks/useLeadEnums';
import axios from "@/utils/axios";

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

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const frmData = {
      leadName: formData.get('leadName'), // Name of the lead
      job_title: formData.get('job_title'), // Job title of the lead
      phoneNumber: formData.get('phoneNumber'), // Phone number of the lead
      mobile: formData.get('mobile'), // Mobile number of the lead
      whatsapp: formData.get('whatsapp'), // Whatsapp number of the lead
      source: formData.get('source'), // Lead source
      industry: formData.get('industry'), // Industry associated with the lead
      company: formData.get('company'), // Company associated with the lead
      email: formData.get('email'), // Email of the lead
      fax: formData.get('fax'), // Fax number of the lead
      website: formData.get('website'), // Website of the lead
      status: formData.get('status'), // Status of the lead
      employees: formData.get('employees'), // Number of employees
      rating: formData.get('rating'), // Rating of the lead
      project_id: formData.get('project_id'), // Project associated with the lead
      campaign: formData.get('campaign'), // Campaign associated with the lead
      date: formData.get('date'), // Date associated with the lead
      remarks: formData.get('remarks'), // Remarks about the lead
      revenue: formData.get('revenue'), // Revenue associated with the lead
      budget: formData.get('budget'), // Budget associated with the lead.
      skype: formData.get('skype'), // Skype ID of the lead
    };
   
    console.log(frmData);
    axios.post(
      "/api/leads",
      frmData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
     
   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { data: enumsData } = useLeadEnums();

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto my-auto max-w-xl lg:max-w-[50rem]">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            New Lead
          </h2>
          <hr className="mb-4" />
          <form method="post" action="#" onSubmit={submitForm} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Add Leads
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Add details such as name, phone number, date and project.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="leadName"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full lg:w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="company"
                  id="company"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="job_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Title:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="job_title"
                  id="desc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>

              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="phoneNumber"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="fax"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fax:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="fax"
                  id="fax"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="-----"
                  required=""
                />
              </div>

              <div>
                <label
                  for="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="mobile"
                  id="mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="website"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Website:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="website"
                  id="website"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="whatsapp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Whatsapp:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
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
                required=""
              >
                <option value="" disabled selected>Select Status</option>
                {enumsData?.statuses?.map(status => (
              <option key={status} value={status}>{status}</option> 
                ))}
              </select>
            </div>
              <div>
                <label
                  for="source"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Source:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="source"
                  id="source"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="employees"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Employees:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="employees"
                  id="employees"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>

              <div>
                <label
                  for="industry"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Industry:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="industry"
                  id="Industry"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="rating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rating:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="rating"
                  id="rating"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>

              <div>
                <label
                  for="revenue"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Revenue:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="revenue"
                  id="revenue"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="skype"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Skype:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="skype"
                  id="skype"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>

              <div>
                <label
                  for="twitter"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Twitter:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="twitter"
                  id="twitter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="-----"
                  required=""
                />
              </div>
              <div>
                <label
                  for="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="date"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="-----"
                  required=""
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  for="project"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project:
                </label>
                <select
                  style={{ width: "100%" }}
                  name="project_id"
                  id="project_id"
                  value={formData.project_id} 
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                <option value="">Select Project</option>
                {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.project_name}</option>
                ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  for="budget"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Budget:
                </label>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  name="budget"
                  id="budget"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" -----"
                  required=""
                />
              </div>
            </div>
            <div>
              <label
                for="remarks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Remarks:
              </label>
              <textarea
                style={{ width: "100%" }}
                name="remarks"
                id="remarks"
                rows="4"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter Remarks"
              ></textarea>
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
