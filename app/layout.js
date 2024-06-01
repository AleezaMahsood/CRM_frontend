'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/providers";
import Sidebar from "@/components/Sidebar";
import UserSidebar from "@/components/UserSidebar";
import { useSearchParams,useRouter } from 'next/navigation';
import { RecoilRoot, useRecoilValue } from "recoil";
import { roleState } from "@/atoms/roleAtom";
import TestSidebar from "@/components/TestSidebar";
import MenuBarMobile from "@/components/MenuBarMobile";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const RenderSidebar = ({show,setter}) => {
  const userRole = useRecoilValue(roleState);

  if (userRole === "admin") {
    return( 
      <>
      <MenuBarMobile setter={setter} />
    <TestSidebar show={show} setter={setter} />
    </>)
   } else if (userRole === "user") {
    return( 
      <>
      <MenuBarMobile setter={setter} />
      <UserSidebar show={show} setter={setter} />
    </>)
   } else {
    return null;
  }
};

export default function RootLayout({ children }) {
  const [showSidebar,setShowSidebar]=useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <div className="flex">
            <Providers>
            <RecoilRoot>
              <RenderSidebar show={showSidebar} setter={setShowSidebar} />
              <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
              {children}
              </div>
              </RecoilRoot>
            </Providers>
            </div>
        </div>
      </body>
    </html>
  );
}

