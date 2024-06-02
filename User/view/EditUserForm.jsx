'use client';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEnums } from '@/hooks/useEnums';
import axios from "axios";

const EditUserForm = ({ onUpdate, onClose }) => {
  const { register, handleSubmit, setError, formState: { errors }, reset, getValues } = useForm();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: enumsData } = useEnums();

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        // Fetch user ID
        const userResponse = await axios.post("http://localhost:8000/api/auth/me", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.data && userResponse.data.id) {
          setUserId(userResponse.data.id);

          // Fetch user data
          const userDataResponse = await axios.get(`http://localhost:8000/api/auth/user/${userResponse.data.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          reset(userDataResponse.data);
        } else {
          throw new Error("User ID not found in response");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user ID or data:", error);
        setErrorMessage("Error fetching user data.");
        setLoading(false);
      }
    };

    fetchUserIdAndData();
  }, [reset]);

  const onSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:8000/api/auth/user/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("User updated successfully!");
      if (onUpdate) {
        onUpdate(formData);
      }
      setTimeout(() => {
        setSuccessMessage("");
        if (onClose) {
          onClose();
        }
      }, 3000);
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setTimeout(() => {
        setErrorMessage("");
        if (onClose) {
          onClose();
        }
      }, 3000);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Edit User</h2>
        <hr className="mb-4" />
        {successMessage && (
          <div className="mb-4 p-4 bg-gray-100 border-l-4 border-green-500 text-green-700">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 bg-gray-100 border-l-4 border-red-500 text-red-700">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="form-group">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  {...register("firstName")}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  {...register("lastName")}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  {...register("phone", {
                    maxLength: {
                      value: 11,
                      message: "Phone number cannot exceed 11 digits",
                    },
                    pattern: {
                      value:  /^[0-9]{11}$/,
                      message: "Phone number must be a valid number",
                    },
                  })}
                  className={`bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="form-group">
                <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation:</label>
                <select
                  id="designation"
                  name="designation"
                  {...register("designation")}
                  className={`bg-gray-50 border ${errors.designation ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                >
                  <option value="" disabled>Select Designation</option>
                  {enumsData?.designations?.map(designation => (
                    <option key={designation} value={designation}>{designation}</option>
                  ))}
                </select>
                {errors.designation && (
                  <p className="text-red-500 text-sm">{errors.designation.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="team" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team:</label>
                <select
                  id="team"
                  name="team"
                  {...register("team")}
                  className={`bg-gray-50 border ${errors.team ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                >
                  <option value="" disabled>Select Team</option>
                  {enumsData?.teams?.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
                {errors.team && (
                  <p className="text-red-500 text-sm">{errors.team.message}</p>
                )}
              </div>
              <div className="form-group col-span-2">
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location:</label>
                <select
                  id="location"
                  name="location"
                  {...register("location")}
                  className={`bg-gray-50 border ${errors.location ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                >
                  <option value="" disabled>Select Location</option>
                  {enumsData?.locations?.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="form-group">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password:</label>
                <input
                  type="password"
                  id="password"
              
                  name="password"
                  placeholder="Enter your Old Password"
                  {...register("password")}
                  className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                />
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your New Password"
                  {...register("newPassword", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  className={`bg-gray-50 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                )}
              </div>
              <div className="form-group col-span-2">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    validate: value => value === getValues('newPassword') || "Passwords do not match",
                  })}
                  className={`bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Update User"
            className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6"
          />
          
        </form>
      </div>
    </section>
  );
};

export default EditUserForm;
