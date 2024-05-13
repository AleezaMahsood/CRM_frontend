'use client'
import React from 'react'
import Table from '@/components/Table';
import { useUsers } from '@/hooks/useUsers';
const ViewUsers = () => {
   const{data,isLoading,isError}=useUsers()
    
      // Define headings and rows
      const headings = ['#', 'NAME', 'DEPARTMENT', 'GENDER', 'LOCATION', 'STATUS','LAST LOGGEDIN'];
      const rows = ['id','firstName', 'department', 'gender', 'location', 'status', 'last_login_time'];
    return (
        <div>
          <Table
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

export default ViewUsers