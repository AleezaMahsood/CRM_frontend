"use client";
import React from "react";
import { useState, useEffect } from "react";
import CountLeads from "./CountLeads";
import useLeadCount from "@/hooks/useLeadCount";

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

  return (
    <>
      <div className="text-3xl text-[black] font-bold mx-7 my-7 ">
        Dashboard
      </div>
      {isLoading ? ( // Display loading indicator while loading
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row justify-center align-center gap-[20px] flex-wrap">
          {Object.keys(data).map((key, index) => (
            <a key={index} href={`/user/LeadsByStatus/?status=${key}`}>
              <div className="flex flex-row justify-between h-[4.5rem] w-full shadow-md rounded-xl bg-white dark:bg-background-darkSecondary">
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
                  <span className="mb-1 text-blueGray-500 text-sm md:text-md dark:text-blueGray-300 md:font-medium font-semibold text-grey dark:text-white">
                    {key}
                  </span>
                  <span className="ml-2 text-black font-medium dark:text-white text-xs uppercase">
                    {data[key]} Leads
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
