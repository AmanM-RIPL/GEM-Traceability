"use client";
import Status from "@/app/components/layout/Status";
import { Dropdown } from "@/app/components/ui/Dropdown";

import dynamic from "next/dynamic";
const FleetMap = dynamic(() => import("../../components/layout/FleetMap"), {
  ssr: false,
});
const fleet = () => {
  return (
     <div className="w-full ml-0 m-0 h-fit px-5 bg-gray-100 lg:pl-[320px] ">
      <h3 className="text-2xl font-medium mb-4">Fleet Tracking</h3>
      <Status/>
      <FleetMap/>
      </div>

  );
};

export default fleet;