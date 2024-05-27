'use client'
import React from 'react'
import Table from '@/components/Table';
import { useUsers } from '@/hooks/useUsers';

const ViewUsers = () => {
  const{data,isLoading,isError}=useUsers()
  
  /*const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'IT', gender: 'Male', location: 'Location 1', status: 'Active', last_login_time: '3 weeks ago' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'HR', gender: 'Female', location: 'Location 2', status: 'Inactive', last_login_time: '2 days ago' },
    { id: 3, name: 'David Brown', email: 'david.brown@example.com', department: 'Finance', gender: 'Male', location: 'Location 3', status: 'Pending', last_login_time: '1 month ago' },
  ];*/

  // Define headings and rows
  const headings = ['#', 'NAME', 'DEPARTMENT', 'GENDER', 'LOCATION', 'STATUS','LAST LOGGEDIN'];
  const rows = ['id', 'nameEmail', 'department', 'gender', 'location', 'status', 'last_login_time'];

  return (
    <div>
      <Table
        title="All Users"
        data={data}
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
