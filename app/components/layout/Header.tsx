"use client";
import { Search } from "lucide-react";
import { FaBell } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import Input from "../ui/Input";
import { useSession } from "next-auth/react";
import { Dropdown } from "../ui/Dropdown";
import { signOutWithGoogle } from "@/app/actions/auth";

const Header = () => {
  const { data: session, status, } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="w-full h-16 mt-3 px-4 rounded-lg flex items-center justify-between gap-4">
      {/* Search */}
      <Input icon={Search} placeholder="Search" />

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            aria-label="Toggle notifications"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaBell className="w-5 h-5 text-yellow-500 cursor-pointer" />
          </button>

          {/* Notification dropdown placeholder */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
              <p className="text-sm text-gray-500">No new notifications</p>
            </div>
          )}
        </div>

        {session ? (<Dropdown
          label={session?.user?.name ?? undefined}
          options={["logout", "Profile"]}
          onSelect={(option:string) => {
            if (option === "logout") {             
              signOutWithGoogle();
            }
            if (option === "Profile") {
              console.log("Go to profile");
            }
          }}
        />) : ("Sign in")}

        <Link
          href="/signup"
          className="bg-[#046A38] hover:bg-[#035a30] text-white font-semibold text-sm py-1.5 px-4 rounded-md transition-colors"
        >
          Start KYC
        </Link>
      </div>
    </div>
  );
};

export default Header;