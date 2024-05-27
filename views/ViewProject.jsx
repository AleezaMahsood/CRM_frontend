'use client'
import React from 'react'
import Table from '@/components/Table';
import useProject from '@/hooks/useProject';
const ViewProject = () => {
  const{data,isLoading,isError}=useProject()

  /*const data = [
    {id: '1', project_name: 'Awesome Project', project_location: 'Hogwarts', project_type: 'Sexy'},
    {id: '2', project_name: 'Good Project', project_location: 'Durmstrang', project_type: 'Meh'},
  ];*/

  // Define headings and rows
  const headings = ['#', 'NAME', 'LOCATION', 'TYPE'];
  const rows = ['id', 'project_name', 'project_location', 'project_type'];

  return (
    <div>
      <Table
        title="All Projects"
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

export default ViewProject;
