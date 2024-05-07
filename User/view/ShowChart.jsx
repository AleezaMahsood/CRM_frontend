// YourNextPage.js
import React from 'react';
import UserPerformance from './UserPerformance';
import BarChart from './UserPerformance';


const ShowChart = () => {
  const leadConversionData = {
    labels: ['pending', 'closed', 'converted','follow ups'],
    totalLeads: [50, 75, 100,40],
    conversionRate: [30, 50, 60,20], // Conversion rate in percentage (e.g., 30%)
  };

  return (
    <div>
      <h2>Lead Conversion Chart</h2>
      <BarChart data={leadConversionData} />
    </div>
  );
};

export default ShowChart;
