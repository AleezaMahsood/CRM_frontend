'use client'
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useAdminGraph from "@/hooks/useAdminGraph";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const AdminChart = () => {
  const [chartData, setChartData] = useState({});
  const { data, isError, isLoading } = useAdminGraph();

  useEffect(() => {
    if (data && !isError && !isLoading) {
      const labels = Object.keys(data);
      const statuses = [
          'New', 
          'Follow Ups', 
          'Converted', 
          'Rejected',
          'Not Interested', 
          'Invalid'
      ];

      const datasets = statuses.map(status => {
          return {
              label: status,
              data: labels.map(date => data[date][status] || 0),
              borderColor: getColor(status),
              borderWidth: 2,
              fill: false,
              tension: 0.1,
              borderDash: [5, 5], // Dotted line
          };
      });

      setChartData({
          labels: labels.map(label => new Date(label + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })),
          datasets: datasets,
      });
    }
  }, [data, isError, isLoading]);

  const getColor = (status) => {
    switch (status) {
      case 'New': return 'black';
      case 'Follow Ups': return 'blue';
      case 'Converted': return 'green';
      case 'Rejected': return 'red';
      case 'Not Interested': return 'darkcyan'
      case 'Invalid': return 'grey';
      default: return 'black';
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return value + '%'; // Format as percentage
          }
        },
        title: {
          display: true,
          text: 'Percentage'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
          }
        }
      }
    }
  };

  return (
    <div>
      {
        chartData?.datasets?.length >0 &&
        <Line data={chartData} options={options} />
      }
    
    </div>
  );
};

export default AdminChart;
