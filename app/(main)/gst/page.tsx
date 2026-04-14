"use client";
import { Inputs } from "@/app/components/ui/Inputs";
import { gstSchema } from "@/app/lib/validation/validationSchema";
import { dynamicImport, LazyLoadImage } from "@/app/utils/common";
import { containerVariants, itemVariants } from "@/app/utils/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

type RemoveType = {
  id: number;
  onRemove: (id: number) => void;
};
function Gst({ onRemove, id }:RemoveType) {
    const [gstValue, setGstValue] = useState("");
    const [error, setError] = useState("");
    const [cameraOpen, setCameraOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const handlePreload = () => {
    import("../../components/ui/Modal"); 
  };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setGstValue(value);
        const result = gstSchema.safeParse({ gstNumber: value });
        if (!result.success) {
            setError(result.error.flatten().fieldErrors.gstNumber?.[0] || "");
        } else {
            setError("");
        }
    };

    return (
        <>
            {/* {cameraOpen && <CameraModal open={cameraOpen} setOpen={setCameraOpen} />} */}
            <div className="flex gap-2">
                <div className="relative flex-1">

                    <Inputs
                        type="text"
                        placeholder="e.g. ABCDE1234F"
                        className={`w-full font-mono tracking-widest uppercase pr-10 transition-all ${error ? "border-red-400 focus:ring-red-200" : ""
                            }`}
                        value={gstValue}
                        onChange={handleChange}
                        maxLength={10}
                        autoComplete="off"
                        spellCheck={false}
                        inputMode="text"
                    />
                </div>
                <motion.button
                    type="button"
                    aria-label="Scan PAN card with camera"
                    onClick={() => setCameraOpen(true)}
                    onMouseEnter={handlePreload}
                    onFocus={handlePreload}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    disabled={isLoading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition hover:border-[#046A38] hover:text-[#046A38] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <FaCamera className="h-4 w-4" />
                </motion.button>
                <motion.button
                    type="button"
                    aria-label="Scan PAN card with camera"
                    onClick={() => onRemove(id)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    disabled={isLoading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition hover:border-[#046A38] hover:text-[#046A38] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <MdDelete className="h-4 w-4" />

                </motion.button>

            </div>
        </>

    );


}
const GstVerification = () => {
    const [gst, setGst] = useState([1]);
    const addGstNumber = () => {
        setGst((prev) => [...prev, Date.now()]);
    };
    
    function removeClock(id:number) {
        setGst((prev) => prev.filter((item) => item !== id));
    }

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
                        {/* {heading || ""} */}KYC Verification
                    </motion.h2>

                    <motion.p variants={itemVariants} className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
                        {/* {description} */}
                        Please add GST numbers and wait for the verification
                    </motion.p>
                    {gst.map((item) => (
                        <Gst
                            key={item}
                            id={item}
                            onRemove={removeClock}
                        />

                    ))}
                    <motion.button
                        onClick={addGstNumber}
                        type="submit"
                        className="relative mt-2 flex h-11 w-full items-center justify-center rounded-xl  text-sm font-semibold text-[##321A1A] shadow-md transition  disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <FaCirclePlus />
                        Add New GST Number
                    </motion.button>


                </motion.div>
            </div>

            <div className="order-2 relative flex min-h-[260px] items-center justify-start overflow-hidden bg-[#046A38] px-6  sm:min-h-[320px] sm:px-10 lg:order-2  lg:px-16 ">
                {/* {show && show ? <LazyComponent /> : <LazyLoadImage image={img} />} */}
                {/* <LazyLoadImage image="" /> */}
                <LazyLoadImage image="/image/gst_sample.jpg" />
            </div>
        </div>

    );
};

export default GstVerification;


