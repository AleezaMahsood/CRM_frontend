'use client'
import React from 'react'
import Table from '@/components/Table';
import useLeads from '@/hooks/useLeads';
const ViewLeads = () => {
  const{data,isLoading,isError}=useLeads()

  /*const data = [
    { id: 1, leadName: 'Fatima', phone: '0333 1234567', project: 'Project Alpha', date: '2024-05-01', user_id: 'Ahmed', Dept: 'Sales', status: 'Active' },
    { id: 2, leadName: 'Fatima 2', phone: '0677 9876543', project: 'Project Beta', date: '2024-05-27', user_id: 'Amna', Dept: 'CS', status: 'Active' },
  ];*/
  // Define headings and rows
  const headings = ['#', 'CLIENT', 'PROJECT', 'LEAD DATE', 'ASSIGNED TO', 'STATUS'];
  const rows = ['id', 'leadNamePhone', 'project', 'date', 'user_id_Dept', 'status'];

  return (
    <div>
      <Table
        title="All Leads"
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

export default ViewLeads;
