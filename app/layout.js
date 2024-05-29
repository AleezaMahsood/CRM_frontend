'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/providers";
import Sidebar from "@/components/Sidebar";
import UserSidebar from "@/components/UserSidebar";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState,useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const [role, setRole] = useState(null);
  const [sidebar, setSidebar] = useState(false)

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
   
  }, []);
  const sidebarR = useMemo(() => {
    if (role === "admin") {
      return <Sidebar />;
    } else if (role === "user") {
      return <UserSidebar />;
    } else {
      return null;
    }
  }, [role]);
  const renderSidebar = () => {
    
  //  if(!sidebar){
  //   if (role === "admin") {
  //    setSidebar(true)
  //    return <Sidebar />;
  //   } else if (role === "user") {
  //    setSidebar(true)
  //    return <UserSidebar />;
  //   } else {
  //    return null;
  //  }
  //}
  };
  
  return (
    <html lang="en">
      <body className={inter.className}>
       <Sidebar />
            <Providers>
              <div className="ml-0 lg:ml-[15rem]">
              {children}
              </div>
            </Providers>


      </body>
    </html>
  );
}
