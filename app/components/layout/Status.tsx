import { Dropdown } from "../ui/Dropdown";

const Status = () => {
  return (
    <>
     <hr className="mb-4 border-b border-gray-300" />

      {/* Filter row */}
      <div className="flex flex-col md:flex-row  justify-between md:items-center mb-4">
        <div className="flex items-center   gap-2">
          <Dropdown
            label="Status"
            options={["All", "Pending", "Approved", "Rejected"]}
          />
          <Dropdown
            label="Dates"
            options={["Today", "This Week", "This Month", "Custom"]}
          />
          <Dropdown
            label="Filter"
            options={["Newest First", "Oldest First", "A - Z", "Z - A"]}
          />
        </div>
        <button
          className="px-4 py-1.5 text-sm sm:mt-5 font-medium text-white rounded-md hover:opacity-90 transition-opacity"
          style={{ background: "#C6A75E" }}
        >
          + Add New
        </button>
      </div>
    </>
  );
};

export default Status;