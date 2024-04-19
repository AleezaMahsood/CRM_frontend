'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import CountLeads from './CountLeads';
import useLeadCount from '@/hooks/useLeadCount';

const Dashboard = () => {
    // Get the user en from local storage or wherever it's stored
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
  // Effect to retrieve the token from local storage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setToken(storedToken);
    setUserId(storedUserId);
    
  }, []);
  const { data, isLoading, isError } = useLeadCount(userId);
  console.log(data)
  return (
    <>
    <div className='text-3xl text-[black] font-bold mx-7 my-7 '>Dashboard</div>
       <div className='flex flex-row h-[5rem] mx-4 my-4 gap-4'>
      
        {data?.map((lead, index) => (
          <a href={`/user/LeadsByStatus/?status=${lead.status}`}>
          <div className='flex flex-row justify-between w-full  shadow-md rounded-xl bg-white dark:bg-background-darkSecondary'>
            <div>
              <img src="/status.svg" alt="" width={'40px'} height={'40px'} />
            </div>
            <div className='flex flex-row w-[10rem] gap-5'>
            <span className='mb-1 text-blueGray-500 text-sm md:text-md dark:text-blueGray-300 md:font-medium font-semibold text-grey dark:text-white'>{lead.status}</span>
            <span className='ml-2 text-black font-medium dark:text-white text-xs uppercase'>lead{lead.count}</span>
            </div>
          </div>
          </a>
      ))}
      
         
       </div>

    </>
  )
}

export default Dashboard



