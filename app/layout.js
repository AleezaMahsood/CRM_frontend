'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/providers";
import Sidebar from "@/components/Sidebar";
import UserSidebar from "@/components/UserSidebar";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
  }, []);
  const renderSidebar = () => {
    if (role === "admin") {
      return <Sidebar />;
    } else if (role === "user") {
      return <UserSidebar />;
    } else {
      return null;
    }
  };
  return (
    <html lang="en">
      <body className={inter.className}>
       <Sidebar />
            <Providers>
              {children}
            </Providers>


      </body>
    </html>
  );
}
