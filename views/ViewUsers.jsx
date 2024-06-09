'use client';
import React, { useState, useEffect } from 'react';
import Table from '@/components/Table';
import { useUsers } from '@/hooks/useUsers';

const ViewUsers = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    if (users) {
      applyFilters();
    }
  }, [users, filters]);

  const applyFilters = () => {
    if (!users) return;

    let filtered = users;

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(user => {
          const value = user[key]?.toString().toLowerCase();
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
    { value: 'firstName', label: 'Name' },
    { value: 'department', label: 'Department' },
    { value: 'gender', label: 'Gender' },
    { value: 'location', label: 'Location' },
    { value: 'status', label: 'Status' },
    { value: 'last_login_time', label: 'Last Login Time' }
  ];

  const headings = ['#', 'NAME', 'DEPARTMENT', 'GENDER', 'LOCATION', 'STATUS', 'LAST LOGGEDIN'];
  const rows = ['id', 'nameEmail', 'department', 'gender', 'location', 'status', 'last_login_time'];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;

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
              type={selectedFilter === 'last_login_time' ? 'date' : 'text'}
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
        title="All Users"
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

export default ViewUsers;
