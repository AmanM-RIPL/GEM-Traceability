"use client";
import { motion, AnimatePresence } from "framer-motion";
import { KycDashboardProps } from "../../types/globaltypes";
import { containerVariants, itemVariants } from "@/app/utils/types";
import Form from "./Form";
import { dynamicImport } from "@/app/utils/common";
const LazyLoadImage = dynamicImport(() => import("../../components/layout/Picture"), { ssr: false }, "Loading Image...");

const KycDashboard = ({
    heading,
    show,
    onChange,
    error,
    onScan,
    description = "",
    isLoading,
    isValid,
    value,
    LazyComponent,
    img
}: KycDashboardProps) => {
    return (
        <div className="grid min-h-[calc(100vh-7rem)]  grid-cols-1 bg-white lg:grid-cols-2 lg:pl-[320px]">
            <div className="order-1 flex justify-center bg-white px-6 py-10 sm:px-10 lg:order-1 lg:px-14 lg:py-16">
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    className="w-full max-w-sm sm:max-w-md"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="mb-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                    >
                        {heading || ""}
                    </motion.h2>

                    <motion.p variants={itemVariants} className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
                        {description}
                    </motion.p>
                    <Form
                        value={value}
                        error={error}
                        isValid={isValid}
                        onChange={onChange}
                        onScan={onScan}
                        isLoading={isLoading}
                      
                    />
                </motion.div>
            </div>
            <div className="order-2 relative flex min-h-[260px] items-center justify-start overflow-hidden bg-[#046A38] px-6  sm:min-h-[320px] sm:px-10 lg:order-2  lg:px-16 ">
                {show && LazyComponent  ? <LazyComponent /> : <LazyLoadImage image={img} />}

            </div>
        </div>

    );
};

export default KycDashboard;