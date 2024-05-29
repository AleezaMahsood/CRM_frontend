import LeadReport from '@/components/LeadsReport'
import AdminGraph from '@/views/AdminGraph'
import ProjectGraph from '@/views/ProjectGraph'
import React from 'react'

const page = () => {
  return (
    <>
    <AdminGraph />
    <ProjectGraph />
    <LeadReport />
    </>
  )
}

export default page