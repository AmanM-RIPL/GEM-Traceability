"use client";

import Dashboard  from "@/app/components/layout/Dashboard";
import { userEmailData } from "@/data/user";

const columns = [
   { key: "id" as const, label: "ID" },
   { key: "email" as const, label: "Email" },
   { key: "status" as const, label: "Status" },
   { key: "action" as const, label: "Action" },
];
const KycVerification = () => {
    return (
        <Dashboard heading="KYC Verification" data={userEmailData} columns={columns}/>
       
    );
};

export default KycVerification;