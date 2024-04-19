'use client'
import React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
const page = () => {
    const searchParams = useSearchParams()
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    /*const response =  fetch('http://localhost:8000/api/user-leads', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    const userData = response.json();
    console.log(userData) */
          fetch('http://localhost:8000/api/user-leads', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        //'Content-Type': 'application/json'
    }
})
.then(response => {
    // Handle response
})
.catch(error => {
    console.error('Error:', error);
});
   console.log(token)     
      
  
  const status = searchParams.get('status')
  return (
    <>
    <div>Table</div>
    <div>{status}</div>
    </>
  )
}

export default page