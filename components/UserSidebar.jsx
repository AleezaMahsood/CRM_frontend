"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiCalendarWeek, BiUserCircle ,BiSolidUser,BiFoodMenu,BiSolidLogOut,BiSolidUserDetail,BiSolidUserPlus } from "react-icons/bi";


export default function UserSidebar({ show, setter }) {
    const router = useRouter();
    const [openDropdown, setOpenDropdown] = useState(null); // state to track which dropdown is open
     const handleSignOut = async () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert('No token found.');
            return;
        }
    
        const response = await fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    
        if (response.ok) {
            // Clear the token from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            window.location='/login';
            // Redirect to login page on successful sign out
        } else {
            // Handle sign out failure
            alert('Sign out failed.');
        }
    };


    // Define our base class
    const className = "bg-white w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visibility
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon: Icon, name, route }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-black" : "text-black/70 hover:text-black hover:bg-gray-100";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-black/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    <Icon />
                </div>
                <div>
                    <strong>{name}</strong>                    
                </div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className} ${appendClass}`}>
                <div className="p-1 flex">
                    <img src="/logo.jpeg" alt="CRM Image" className="mr-4"></img>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <MenuItem
                        name="User"
                        route="/"
                        icon={BiSolidUser}
                    />
                    <MenuItem
                        name="Dashboard"
                        route="/user/dashboard"
                        icon={BiCalendarWeek}
                    />
                    <MenuItem
                        name="All Leads"
                        route="/user/UserLead"
                        icon={BiSolidUserDetail }
                    />
                     <MenuItem
                        name="Add Lead"
                        route="/user/LeadsByStatus"
                        icon={BiSolidUserPlus  }
                    />
                     <MenuItem
                        name="Account"
                        route="/#"
                        icon={BiUserCircle }
                    />
                     <MenuItem
                        name="Graph Report"
                        route="/#"
                        icon={BiFoodMenu }
                    />
                     <button className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-black/10 text-black/70 hover:text-black hover:bg-gray-100`} onClick={handleSignOut}><BiSolidLogOut className={`text-xl flex [&>*]:mx-auto w-[30px]`} /><strong> Sign Out </strong></button>
                </div>
            </div>
            {show && <ModalOverlay />}
        </>
    )
}