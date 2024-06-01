"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiCalendarWeek, BiBarChart ,BiSolidUser,BiFoodMenu,BiSolidGroup,BiSolidLogOut,BiSolidParty  } from "react-icons/bi";


export default function TestSidebar({ show, setter }) {
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

    const DropdownItem = ({ name, links, icon: Icon, dropdownKey }) => {
        const dropdownOpen = openDropdown === dropdownKey; // check if this dropdown is open

        return (
            <>
                <button
                    type="button"
                    className="flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-black/10 text-black/70 hover:text-black hover:bg-gray-100"
                    onClick={() => setOpenDropdown(dropdownOpen ? null : dropdownKey)} // toggle dropdown
                >
                    <Icon className="text-lg mr-2" />
                    <span className="flex-1 text-left whitespace-nowrap"><strong>{name}</strong></span>
                    <svg className="w-3 h-3 " aria-hidden="true" fill="none" viewBox="0 0 10 6">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                {dropdownOpen && (
                    <ul className="pl-11 space-y-2">
                        {links.map(link => (
                            <li key={link.name}>
                                <Link
                                    href={link.route}
                                    className="flex items-center w-full p-2 text-black/70 transition duration-75 rounded-lg group hover:bg-gray-100  hover:text-black"
                                    onClick={() => {
                                        setter(oldVal => !oldVal);
                                    }}
                                >
                                    <strong>{link.name}</strong>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </>
        )
    }

    return (
        <>
            <div className={`${className} ${appendClass}`}>
                <div className="p-1 flex">
                    <img src="/logo.jpeg" alt="CRM Image" className="mr-4"></img>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                    <MenuItem
                        name="Dashboard"
                        route="/adminDashboard"
                        icon={BiCalendarWeek}
                    />
                    <DropdownItem
                        name="Leads"
                        links={[
                            { name: "Over-All Leads", route: "/Leads/AllLeads" },
                            { name: "Add Lead", route: "/Leads/CreateLeads" }
                        ]}
                        icon={BiSolidUser}
                        dropdownKey="leads"
                    />
                    <DropdownItem
                       
                        name="Projects"
                        links={[
                            { name: "All Projects", route: "/Projects/AllProjects"},
                            { name: "Add Project", route: "/Projects/CreateProjects"}
                        ]}
                        icon={BiFoodMenu}
                        dropdownKey="projects"
                    />
                    <DropdownItem
                        name="Campaigns"
                        links={[
                            { name: "Over-All Campaigns", route: "/Campaigns/AllCampaigns"},
                            { name: "Add Campaign", route: "/Campaigns/CreateCampaigns"}
                        ]}
                        icon={BiSolidParty}
                        dropdownKey="campaigns"
                    />
                    <DropdownItem
                        name="Users"
                        links={[
                            { name: "Over-All Users", route: "/AllUsers"},
                            { name: "Add User", route: "/register"},
                            { name: "Feedbacks", route: "/Users/Feedbacks" }
                        ]}
                        icon={BiSolidGroup}
                        dropdownKey="users"
                    />
                    <MenuItem
                        name="Performance"
                        route="/adminPerformance"
                        icon={BiBarChart }
                    />
                    <button className={`flex gap-1 [&>*]:my-auto text-md pl-4 py-3 border-b-[1px] border-b-black/10 text-black/70 hover:text-black hover:bg-gray-100`} onClick={handleSignOut}><BiSolidLogOut className={`text-xl flex [&>*]:mx-auto w-[30px]`} /><strong> Sign Out </strong></button>
                </div>
            </div>
            {show && <ModalOverlay />}
        </>
    )
}