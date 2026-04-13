"use client";

import Dashboard from "@/app/components/layout/Dashboard";
import { shipmentDataDashboard } from "@/data/user";

const columns = [
    { key: "id" as const, label: "ID" },
    { key: "userId" as const, label: "UserId" },
    { key: "description" as const, label: "Description" },
    { key: "currentLocation" as const, label: "Current Location " },
    { key: "status" as const, label: "Status" },
    { key: "lastUpdate" as const, label: "Last Update" },
    { key: "action" as const, label: "Action" },
];
const KycVerification = () => {
    return (
        <Dashboard heading="Shipment Tracking" data={shipmentDataDashboard} columns={columns} />

    );
};

export default KycVerification;