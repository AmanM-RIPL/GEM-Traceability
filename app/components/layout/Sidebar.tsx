"use client";

import {  useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { BsBox } from "react-icons/bs";
import { FaTruck } from "react-icons/fa6";
import Input from "../ui/Input";
import { FleetTrackingData } from "@/data/user";
import { usePathname } from "next/navigation";
import { Truck, Bike } from "lucide-react";
import { isMobile } from "@/app/utils/types";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/store/slices/userSlice";

// type UserRole = "Admin" | "Super Admin" | string;

// interface User {
//     role: UserRole;
// }

// interface RootState {
//     user: {
//         isAuthenticated: boolean;
//         user: User | null;
//     };
// }
const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <IoHomeOutline /> },
    { label: "KYC Verification", href: "/kyc", icon: <GoPerson /> },
    { label: "Shipment", href: "/shipment", icon: <BsBox /> },
    { label: "Fleet Tracking", href: "/fleet", icon: <FaTruck /> },
];

const Sidebar = () => {
    const [show, setShow] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<string>("Dashboard");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(FleetTrackingData[0]);
    const pathname = usePathname();
    //   const { isAuthenticated, user } = useSelector(
    //     (state: RootState) => state.user
    //   );

    //   const dispatch = useDispatch();

    // const handleLogout = () => {
    //     // dispatch(logout());
    // };

    const handleNavClick = () => {
        if (isMobile) {
            setShow(false);
        }
    };
    return (
        <>
            <button
                onClick={() => {setShow(!show),handleNavClick();}}
                className="fixed right-5 top-5 z-50 rounded-md  p-2 text-3xl text-white hover:bg-[#046A38] bg-[#146F3B] lg:hidden"
                aria-label="Open menu"
            >
                <GiHamburgerMenu />
            </button>

            <div
                className={`fixed top-0 z-40 flex h-full w-full flex-col justify-between border-r-[1px] border-r-stone-500 bg-[#FAFAFA] p-4 transition-all duration-100 sm:w-[300px] ${show ? "left-0" : "left-[-100%]"
                    } lg:left-0`}
            >
                <div className="relative">
                    <Link href="/">
                        <h4 className="mb-4 text-2xl font-semibold text-[#146F3B]">
                            Traceability<span className="text-[#046A38] font-bold">FRD</span>
                        </h4>
                    </Link>
                    <hr className="mb-4 border-b border-gray-300" />
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.label}>

                                <Link
                                    href={item.href}

                                    onClick={() => { setActiveItem(item.label); }}
                                    className={`block rounded px-3 flex py-2 text-sm font-medium text-black hover:bg-[#e5e5e5] ${activeItem === item.label ? "bg-[#FFFF]" : "bg-transparent"
                                        }`}
                                >
                                    <span className="mr-4 text-lg">{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <hr className="mb-4 border-b border-gray-300" />
                        {pathname === "/fleet" && (<Input type="text" placeholder="Search" className="mb-2" />)}
                        {pathname === "/fleet" && (FleetTrackingData.map((item) => (
                            <button
                                key={item.vehicleId}
                                onClick={() => {
                                    setSelected(item);
                                    setOpen(false);
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-4 w-full"
                            >
                                {/* LEFT: Icon + Vehicle */}
                                <div className="flex items-center gap-2">
                                    {item.vehicleType === "Truck" ? (
                                        <Truck className="w-5 h-5 text-[#046A38]" />
                                    ) : (
                                        <Bike className="w-5 h-5 text-[#046A38]" />
                                    )}
                                    <span className="font-medium">{item.vehicleType}</span>
                                </div>

                                {/* RIGHT: Status */}
                                <span
                                    className={`px-2 py-1 text-sm rounded-md ${item.status === "pending"
                                        ? "text-yellow-600 bg-yellow-100"
                                        : item.status === "in_transit"
                                            ? "text-blue-600 bg-blue-100"
                                            : "text-green-600 bg-green-100"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </button>
                        )))}
                    </ul>

                </div>

            </div>

        </>
    );
};

export default Sidebar;