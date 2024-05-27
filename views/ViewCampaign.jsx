'use client'
import React from 'react'
import Table from '@/components/Table';
import useCampaign from '@/hooks/useCampaign';
const ViewCampaign = () => {
  const{data,isLoading,isError}=useCampaign()

  /*const data = [
    {campaign_name: 'Duelling Club', description: 'Train young witches and wizards in the art of duelling'},
    {campaign_name: 'Death Eaters', description: 'Terrorist group believing in pureblood supremacy'},
  ];*/
  
  // Define headings and rows
  const headings = ['NAME', 'DESCRIPTION'];
  const rows = ['campaign_name', 'description'];

  return (
    <div>
      <Table
        title="All Campaigns"
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

export default ViewCampaign;
