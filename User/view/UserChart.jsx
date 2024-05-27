// YourNextPage.js
import React from 'react';
import BarChart from '@/components/UserPerformance';
import useUserPerformance from "@/hooks/useUserPerformance"

const UserChart = ({userId}) => {
  const {data,isLoading,isError}=useUserPerformance(userId)
  console.log(data)
  if (isError) {
    return <div className='text-bold mt-5 text-[grey]'>Error: Unable to fetch data</div>;
  }

  // If data exists, extract labels and totalLeads, otherwise provide default values
  const labels = data ? data.labels : [];
  const totalLeads = data ? data.totalLeads : [];
  const leadConversionData = {
    labels: labels,
    totalLeads: totalLeads,
  };

  return (
    <div>
      <BarChart data={leadConversionData} />
    </div>
  );
};

export default UserChart;
