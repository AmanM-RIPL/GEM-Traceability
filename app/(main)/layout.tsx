// app/(main)/layout.tsx
// "use client";
// import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <SessionProvider>
    <div className="bg-gray-100 min-h-screen">
       {/* <aside
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      > */}
        <Sidebar />
      {/* </aside> */}
      <div className="w-full ml-0 m-0 h-fit px-5 bg-white lg:pl-[320px] flex flex-col">
         {/* onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen} */}
        <Header />
      </div>
      <div className="p-4">{children}</div>
    </div>
    </SessionProvider>
  );
}