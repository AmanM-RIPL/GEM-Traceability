import { memo, useMemo } from "react";
import Table from "@/app/components/ui/Table";
import { shipmentData, kycData } from "../../../../data/user";
import { TabsProps } from "@/app/types/globaltypes";

// Move column definitions outside — they're static, no need to recreate
const SHIPMENT_COLUMNS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Shipment Name" },
  { key: "status", label: "Status", color: "#046A38" },
  { key: "location", label: "Location" },
] as const;

const KYC_COLUMNS = [
  { key: "user", label: "User" },
  { key: "status", label: "Status", color: "#046A38" },
  { key: "action", label: "Action" },
] as const;

const Tabs = memo(({ heading = "Recent Shipments", description = "Recent Shipments" }: TabsProps) => {
  // Only recompute if shipmentData/kycData change (useful when they come from props/state later)
  const shipmentTable = useMemo(() => (
    <Table
      data={shipmentData}
      columns={SHIPMENT_COLUMNS}
      heading={heading}
      description={description}
    />
  ), [heading, description]);

  // const kycTable = useMemo(() => (
  //   <Table
  //     data={kycData}
  //     columns={KYC_COLUMNS}
  //     heading="KYC Overview"
  //     description="KYC Verification Status"
  //   />
  // ), []);

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="w-full md:w-3/5 bg-gray-100 p-6">
        {shipmentTable}
      </div>
      <div className="w-full md:w-2/5 bg-gray-100 p-6">
        {/* {kycTable} */}
      </div>
    </div>
  );
});

Tabs.displayName = "Tabs";
export default Tabs;