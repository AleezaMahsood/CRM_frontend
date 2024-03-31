'use client';
import React from 'react'
import axios from '../utils/axios'
import { useEnums } from '@/hooks/useEnums'

const CreateUsers = () => {
    const { data: enumsData, isLoading, isError } = useEnums();
 console.log(enumsData);
 console.log(isError);
    return (
    <>
       <div className="max-w-md mx-auto">
  <form className="mt-8 space-y-6" method="POST" action="#">
    <div>
      <label for="name" className="block text-sm font-medium text-gray-700">Name</label>
      <input id="name" type="text" name="name" required autocomplete="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
    <div>
      <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input id="email" type="email" name="email" required autocomplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
    <div>
      <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input id="password" type="password" name="password" required autocomplete="new-password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
    <div>
      <label for="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
      <input id="password_confirmation" type="password" name="password_confirmation" required autocomplete="new-password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
    
    <div>
      <label for="gender" className="block text-sm font-medium text-gray-700">Gender</label>
      <select id="gender" name="gender" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div>
      <label for="location" className="block text-sm font-medium text-gray-700">Location</label>
      <select id="location" name="location" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      {enumsData?.locations?.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
      </select>
    </div>
    <div>
      <label for="department" className="block text-sm font-medium text-gray-700">Department</label>
      <select id="department" name="department" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        
      </select>
    </div>
    <div>
      <label for="designation" className="block text-sm font-medium text-gray-700">Designation</label>
      <select id="designation" name="designation" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
       
      </select>
    </div>
    <div>
      <label for="team" className="block text-sm font-medium text-gray-700">Team</label>
      <select id="team" name="team" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
       
      </select>
    </div>
    <div>
      <label for="role" className="block text-sm font-medium text-gray-700">Role</label>
      <select id="role" name="role" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">

      </select>
    </div>
    <div>
      <button type="submit" className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Register
      </button>
    </div>
  </form>
</div>

    </>
  )
}

export default CreateUsers