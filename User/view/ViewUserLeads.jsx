'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EditLeadForm from './EditLeads';
import LeadTable from '@/components/LeadTable';
import useSpecificLead from '@/hooks/useSpecificLead';
import useUpdateLead from '@/hooks/useUpdateLeads';
import useProjects from '@/hooks/useProject';
import useUserLeads from '@/hooks/useUserLeads';

const fetchUserData = async () => {
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
  return response.json();
};

const ViewUserLeads = () => {
  const [userId, setUserId] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('');
  const [editLeadId, setEditLeadId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserData();
        setUserId(userData.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const { data: leads, isLoading: isLeadsLoading, isError: isLeadsError } = useUserLeads(userId);
  const { data: projects, isLoading: isProjectsLoading, isError: isProjectsError } = useProjects();
  const { data: editLead, isLoading: isEditLoading } = useSpecificLead(editLeadId);
  const mutation = useUpdateLead();

  const handleUpdate = async (updatedLead) => {
    try {
      await mutation.mutateAsync({ id: updatedLead.id, formData: updatedLead });
      setEditLeadId(null);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleEdit = (leadId) => {
    setEditLeadId(leadId);
  };

  const getProjectName = (projectId) => {
    const project = projects?.find((project) => project.id === projectId);
    return project ? project.project_name : "Unknown Project";
  };

  const enhancedLeads = useMemo(() => {
    return leads?.map((lead) => ({
      ...lead,
      project_name: getProjectName(lead.project_id),
    })) || [];
  }, [leads, projects]);

  const applyFilters = () => {
    if (!enhancedLeads) return [];
    return enhancedLeads.filter((lead) => {
      return Object.keys(filters).every((key) => {
        const value = lead[key]?.toString().toLowerCase();
        return value && value.includes(filters[key].toLowerCase());
      });
    });
  };

  const filteredData = useMemo(() => applyFilters(), [filters, enhancedLeads]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectedFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedFilter('');
  };

  const filterOptions = [
    { value: 'leadName', label: 'Client' },
    { value: 'project_name', label: 'Project' },
    { value: 'date', label: 'Lead Date' },
    { value: 'status', label: 'Status' },
  ];

  const headings = ['#', 'CLIENT', 'PROJECT', 'LEAD DATE', 'STATUS'];
  const rows = ['id', 'leadNamePhone', 'project_name', 'date', 'status'];

 /* if (isLeadsLoading || isProjectsLoading || isEditLoading) {
    return <div>Loading...</div>;
  }

  if (isLeadsError || isProjectsError) {
    return <div>Error fetching data.</div>;
  }*/

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
          <div style={{ marginTop: '20px', marginRight: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
              <div></div>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  value={selectedFilter}
                  onChange={handleSelectedFilterChange}
                  style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid gray', width: '150px' }}
                >
                  <option value="">Filter Records</option>
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {selectedFilter && (
                  <input
                    type={selectedFilter === 'date' ? 'date' : 'text'}
                    name={selectedFilter}
                    placeholder={`Enter ${filterOptions.find((opt) => opt.value === selectedFilter)?.label}`}
                    value={filters[selectedFilter] || ''}
                    onChange={handleFilterChange}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid gray', width: '150px' }}
                  />
                )}
                <button
                  onClick={clearFilters}
                  style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid gray' }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {Object.keys(filters).map((key) => (
                filters[key] && (
                  <div
                    key={key}
                    style={{ margin: '5px', padding: '5px 10px', borderRadius: '5px', background: '#B0E0FC' }}
                  >
                    {filterOptions.find((opt) => opt.value === key)?.label}: {filters[key]}
                  </div>
                )
              ))}
            </div>
          </div>
          <LeadTable
            title="All Leads"
            data={filteredData}
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
