"use client";
import React from "react";
import { useState, useEffect } from "react";
import CountLeads from "./CountLeads";
import useLeadCount from "@/hooks/useLeadCount";
import UserChart from "@/User/view/UserChart";

const Dashboard = () => {
  // Get the user en from local storage or wherever it's stored
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  // Effect to retrieve the token from local storage when the component mounts
  useEffect(() => {
    // Fetch user data after component mounts
    fetch("http://localhost:8000/api/auth/me", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((userData) => {
        setUserId(userData.id);
        // Once the user ID is obtained, fetch the lead count data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  const { data, isLoading, isError } = useLeadCount(userId);
  console.log(userId)

  return (
    <>
      <div className="sm:mx-0 sm:my-0 text-[20px] text-[black] font-bold md:mx-4 md:mt-8 ">
        Dashboard
      </div>
      {isLoading ? ( // Display loading indicator while loading
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row justify-center align-center gap-[2rem] flex-wrap">
          {data && Object.keys(data).map((key, index) => (
            <a key={index} href={`/user/LeadsByStatus/?status=${key}`}>
              <div className="flex flex-row justify-between h-[5rem] w-full shadow-md rounded-xl bg-white dark:bg-background-darkSecondary">
                <div style={{backgroundColor:"#D3D3D3",borderRadius:"5px"}}>
                  <img
                    src="/status.svg"
                    alt=""
                    width={"40px"}
                    height={"40px"}
                    className="mx-4 my-4 color"
                  />
                </div>
                <div className="flex flex-col mt-4 ml-4 w-[10rem] gap-2">
                  <span className="mb-1 ml-3 text-blueGray-500 text-sm font-bold  dark:text-blueGray-300 md:font-bold text-grey dark:text-white">
                    {key}
                  </span>
                  <span className="ml-3 font-bold text-black dark:text-white text-[12px] uppercase">
                    {data[key]} Leads
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      <div className="sm:mx-0 sm:my-0 text-[20px] text-[black] font-bold md:mx-4 md:mt-8">
        User Performance
      </div>
      <UserChart userId={userId} />
    </>
  );
};

export default Dashboard;
