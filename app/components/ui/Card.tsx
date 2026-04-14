"use client";
import React from "react";
import Link from "next/link";
import { CardProps } from "@/app/types/globaltypes";

const Card: React.FC<CardProps> = ({
    Icon,
    title,
    value,
    iconPage,
}) => {
    const iconElement = iconPage ? (
        <Link href={iconPage}>
            <div className="absolute right-2 bottom-2 cursor-pointer h-10 w-10 opacity-20">
                {Icon}
            </div>
        </Link>
    ) : (
         <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full bg-[#C6A75E80] [&>svg]:h-6 [&>svg]:w-6">
        {Icon}
      </div>
    );

    return (
        <>
            <div className="relative bg-white border border-gray-200 rounded-xl p-5 w-full h-25 flex flex-col justify-between overflow-hidden shadow-sm">
                
                <div>
                    <h2 className="text-bold text-gray-500 mb-1">{title}</h2>
                    <p className="text-2xl font-medium text-gray-900">{value}</p>
                </div>
                
                {iconElement}
            </div>
        </>
    );
};

export default Card;