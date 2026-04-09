"use client";
import { useState } from "react";
const StatusToggle = () => {
  const [status, setStatus] = useState<"Pending" | "Approved">("Pending");
  const isApproved = status === "Approved";
  return (
    <button
      onClick={() =>
        setStatus(isApproved ? "Pending" : "Approved")
      }
      className={`relative inline-flex items-center p-1 rounded-[10px] transition-all duration-300
        ${isApproved ? "bg-green-100" : "bg-yellow-100"}`}
    >
      {/* Background labels */}
      <span
        className={`px-3 py-1 text-sm font-medium transition
          ${!isApproved ? "text-gray-400" : "text-gray-400"}`}
      >
        Pending
      </span>

      <span
        className={`px-3 py-1 text-sm font-medium transition
          ${isApproved ? "text-green-700" : "text-gray-400"}`}
      >
        Approved
      </span>

      {/* Sliding indicator */}
      <span
        className={`absolute top-1 bottom-1 rounded-[8px] bg-white shadow transition-all duration-300
          ${isApproved ? "left-1/2 right-1" : "left-1 right-1/2"}`}
      />
    </button>
  );
};

export default StatusToggle;

