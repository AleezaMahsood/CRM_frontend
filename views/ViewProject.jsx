'use client'
import React, { useState, useEffect } from 'react';
import Table from '@/components/Table';
import useProject from '@/hooks/useProject';

const ViewProject = () => {
  const { data: projects, isLoading, isError } = useProject();
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    if (projects) {
      applyFilters();
    }
  }, [projects, filters]);

  const applyFilters = () => {
    if (!projects) return;

    let filtered = projects;

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(project => {
          const value = project[key]?.toString().toLowerCase();
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
    { value: 'project_name', label: 'Name' },
    { value: 'project_location', label: 'Location' },
    { value: 'project_type', label: 'Type' },
  ];

  const headings = ['#', 'NAME', 'LOCATION', 'TYPE'];
  const rows = ['id', 'project_name', 'project_location', 'project_type'];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading projects</p>;

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
              type="text"
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
        title="All Projects"
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

export default ViewProject;
