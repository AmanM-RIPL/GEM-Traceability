"use client";
import { FaSearch } from "react-icons/fa";
import Input from "../ui/Input";
import Table from "@/app/components/ui/Table";
import { ToggleButton } from "../ui/ToggleButton";
import Status from "./Status";
import { columns } from "@/app/types/globaltypes";

const Dashboard = ({
  heading,
  data,
  columns,
}: {
  heading: string;
  data: any[];
  columns: columns[];
}) => {
  return (
    <div className="w-full ml-0 m-0 h-fit px-5 bg-gray-100 lg:pl-[320px] flex flex-col">
      <h3 className="text-2xl font-medium mb-4">{heading}</h3>
      <div className="md:flex md:justify-between md:items-center ">
        <ToggleButton />
        <form className="space-y-4">
          <Input icon={FaSearch} type="Search" placeholder="Search" />
        </form>
      </div>
      {/*  */}
      <Status/>
      <div>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Dashboard;