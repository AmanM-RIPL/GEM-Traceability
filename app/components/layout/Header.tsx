"use client";
import { Search } from "lucide-react";
import Input from "../ui/Input";
import { FaBell } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
const [show, setShow] = useState<boolean>(false);
  return (
    <div className="w-full  h-16 pt-1 mt-3 rounded-lg flex justify-between gap-4 ">
      <div className="flex gap-3 ">
        <FaBell className="w-5 mt-2 h-5 text-yellow-500 cursor-pointer" />

        <Input icon={Search} placeholder="Search" />
      </div>

      <div className=" my-2 flex items-center gap-3">
        <FaBell className="w-5 h-5 text-yellow-500 cursor-pointer" onClick={() => setShow(!show)} />

        <Link
          href="/login"
          className="text-[#046A38] bg-transparent border-[#046A38] border-2 hover:bg-[#046A38] hover:text-[#FFFF] font-bold text-xl py-1 px-4 rounded-md"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="bg-[#046A38] font-semibold hover:bg-[#046A38] text-xl py-1 px-4 rounded-md text-white"
        >
          Start kyc
        </Link>
      </div>
    </div>
  );
};

export default Header;