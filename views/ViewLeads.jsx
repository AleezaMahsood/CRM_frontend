'use client'
import React, { useState, useEffect } from 'react';
import Table from '@/components/Table';
import useLeads from '@/hooks/useLeads';

const ViewLeads = () => {
  const { data: leads, isLoading, isError } = useLeads();
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    if (leads) {
      applyFilters();
    }
  }, [leads, filters]);

  const applyFilters = () => {
    if (!leads) return;

    let filtered = leads;

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(lead => {
          const value = lead[key]?.toString().toLowerCase();
          return value && value.includes(filters[key].toLowerCase());
        });
      }
    });

    setFilteredData(filtered.length > 0 ? filtered : []);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        [name]: value
      };

      if (value === '') {
        delete newFilters[name];
      }

      return newFilters;
    });
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
    { value: 'firstName', label: 'Assigned To' },  // Use 'firstName' for filtering
    { value: 'status', label: 'Status' }
  ];

  const headings = ['#', 'CLIENT', 'PROJECT', 'LEAD DATE', 'ASSIGNED TO', 'STATUS'];
  const rows = ['id', 'leadNamePhone', 'project_name', 'date', 'user_id_Dept', 'status'];  

  return (
    <div style={{ marginTop: '20px', marginRight: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div></div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedFilter}
            onChange={handleSelectedFilterChange}
            style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid gray', width: '150px' }}
          >
            <option value="">Filter Records</option>
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedFilter && (
            <input
              type={selectedFilter === 'date' ? 'date' : 'text'}
              name={selectedFilter}
              placeholder={`Enter ${filterOptions.find(opt => opt.value === selectedFilter)?.label}`}
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
          filters[key] && <div key={key} style={{ margin: '5px', padding: '5px 10px', borderRadius: '5px', background: '#B0E0FC' }}>
            {filterOptions.find(opt => opt.value === key)?.label}: {filters[key]}
          </div>
        ))}
      </div>
      <Table
        title="All Leads"
        data={filteredData}
        tableId="exampleTable"
        entriesPerPageSelectId="entriesPerPageSelect"
        paginationId="pagination"
        headings={headings}
        rows={rows}
      />
    </div>
  );
}

export default ViewLeads;
