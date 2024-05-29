import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
const ProjectChart = ({data}) => {
    const chartData = {
        labels: data.map(d => d.project_type),
        datasets: [
          {
            data: data.map(d => d.count),
            backgroundColor: [
                '#4CAF50', // Web Development
                '#FF9800', // Data Science & Machine Learning
                '#9C27B0', // Artificial Intelligence (AI)
                '#F44336', // Cybersecurity
                '#2196F3', // Cloud Computing
                '#FFEB3B', // Internet of Things (IoT)
                '#607D8B', // Blockchain Technology
                '#00BCD4', // Virtual Reality (VR) and Augmented Reality (AR)
              ],
              borderColor: [
                '#4CAF50',
                '#FF9800',
                '#9C27B0',
                '#F44336',
                '#2196F3',
                '#FFEB3B',
                '#607D8B',
                '#00BCD4',
              ],
            hoverBackgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ],
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      };
    
      return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
          <Pie data={chartData} options={options} />
        </div>
      );
};


export default ProjectChart