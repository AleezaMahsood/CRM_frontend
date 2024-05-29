// pages/index.js
'use client'
import axios from 'axios';
import ProjectChart from '@/components/ProjectChart';
import useProjectGraph from '@/hooks/useProjectGraph';

const ProjectGraph = () => {
  
    const {data,isLoading,isError}=useProjectGraph();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Types Distribution</h1>
      {data?.length > 0 ? (
        <ProjectChart data={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectGraph;
