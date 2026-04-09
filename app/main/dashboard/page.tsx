import { memo, useMemo } from "react";
import Card from "../../components/ui/Card";
import { FaRegUser } from "react-icons/fa";
import Tabs from "./subcomponents/Tabs";

// Move static data outside component to prevent recreation on every render
const CARD_DATA = [
  { title: "Total Users", value: 200 },
  { title: "Pending KYC", value: 50 },
  { title: "Active Shipment", value: 100 },
  { title: "Vehicle Tracked", value: 150 },
] as const;

const TABS_CONFIG = {
  heading: "Recent Shipments",
  description: "Recent Shipment Overview",
} as const;

const DashBoard = memo(() => {
  // Memoize the icon to avoid JSX recreation on each render
  const userIcon = useMemo(() => <FaRegUser />, []);

  return (
    <div className="w-full m-0 h-fit px-5 lg:pl-[300px] flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-[#046A38]">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-1">
        {CARD_DATA.map((card) => (
          <Card
            key={card.title}        // use unique key instead of hardcoded "1"
            Icon={userIcon}
            title={card.title}
            value={card.value}
            id={card.title}         // unique id instead of hardcoded "1"
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row mt-2 gap-5">
        <Tabs {...TABS_CONFIG} />
      </div>
    </div>
  );
});

DashBoard.displayName = "DashBoard";
export default DashBoard;