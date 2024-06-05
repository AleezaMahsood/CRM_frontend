'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditLeadForm from './EditLeads';
import LeadTable from '@/components/LeadTable';
import useSpecificLead from '@/hooks/useSpecificLead';

const ViewUserLeads = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [editLeadId, setEditLeadId] = useState(null);
  const { data: editLead, isLoading: isEditLoading } = useSpecificLead(editLeadId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/me", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserId(userData.id);
        await fetchUserLeads(userData.id);
        await fetchProjects();
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    const fetchUserLeads = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}/lead`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching user leads:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProjects(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = (leadId) => {
    setEditLeadId(leadId);
  };

  const handleUpdate = async (updatedLead) => {
    try {
      await axios.put(`http://localhost:8000/api/leads/${updatedLead.id}`, updatedLead, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedLeads = leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead);
      setLeads(updatedLeads);
      setEditLeadId(null);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find(project => project.id === projectId);
    return project ? project.project_name : "Unknow Project";
  };

  const enhancedLeads = leads.map(lead => ({
    ...lead,
    project_name: getProjectName(lead.project_id)
  }));

  const headings = ['#', 'CLIENT', 'PROJECT', 'LEAD DATE', 'STATUS'];
  const rows = ['id', 'leadNamePhone', 'project_name', 'date', 'status'];

  if (isLoading || isEditLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching leads.</div>;
  }

  return (
    <div className="container">
      {editLeadId ? (
        <div className="flex justify-center items-center h-screen">
          <EditLeadForm
            leadId={editLead?.id}
            onUpdate={handleUpdate}
            leadData={editLead}
            onClose={() => setEditLeadId(null)}
          />
        </div>
      ) : (
        <div>
          <LeadTable
            title="All Leads"
            data={Array.isArray(enhancedLeads) ? enhancedLeads : []}
            tableId="exampleTable"
            entriesPerPageSelectId="entriesPerPageSelect"
            paginationId="pagination"
            headings={headings}
            rows={rows}
            handleEdit={handleEdit}
          />
        </div>
      )}
    </div>
  ); 
};

export default ViewUserLeads;
