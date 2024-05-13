'use client'
import React from 'react'
import Table from '@/components/Table';
import useLeads from '@/hooks/useLeads';
const ViewLeads = () => {
   const{data,isLoading,isError}=useLeads()
    
      // Define headings and rows
      const headings = ['#', 'CLIENT', 'PROJECT', 'LEAD DATE', 'ASSIGNED TO', 'STATUS'];
      const rows = ['id', 'leadName', 'project', 'date', 'phone', 'status'];
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

export default ViewLeads