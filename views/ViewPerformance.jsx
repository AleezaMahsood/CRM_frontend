'use client'
import React from 'react'
import Table from '@/components/Table';
import useUserPerformance from '@/hooks/useUserPerformance';
const ViewPerformance = () => {
  const{data,isLoading,isError}=useUserPerformance()

  /*const data = [
    {user_id: 1, name: 'John Doe', email: 'john.doe@example.com', New: 10, Pending: 5, Follow_Ups: 3, 'Not Responding': 2, 'Not Answering': 1, 'Meeting Scheduled': 4, 'Not Interested': 6, Interested: 8, Converted: 7, Rejected: 2, Invalid: 1, Overall: 46, conversion_rate: '15%', logged_in: '2024-04-01'},
    {user_id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', New: 15, Pending: 3, Follow_Ups: 1, 'Not Responding': 2, 'Not Answering': 3, 'Meeting Scheduled': 2, 'Not Interested': 7, Interested: 9, Converted: 3, Rejected: 1, Invalid: 3, Overall: 50, conversion_rate: '30%', logged_in: '2024-05-27'},
  ];  */
    
  // Define headings and rows
  const headings = ['#', 'NAME', 'NEW', 'PENDING', 'FOLLOW UP', 'NOT RESPONDING', 'NOT ANSWERING', 'MEETINGS SCHEDULED', 'NOT INTERESTED', 'INTERESTED', 'CONVERTED', 'REJECTED', 'INVALID', 'OVERALL', 'CONVERSION RATE', 'LAST LOGGEDIN'];
  const rows = ['user_id', 'nameEmail', 'New', 'Pending', 'Follow_Ups', 'Not Responding', 'Not Answering', 'Meeting Scheduled', 'Not Interested', 'Interested', 'Converted', 'Rejected', 'Invalid', 'Overall', 'conversion_rate', 'logged_in'];

  return (
    <div>
      <Table
        title="Performance"
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

export default ViewPerformance;
