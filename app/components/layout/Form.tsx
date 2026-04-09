import React from "react";
import Input from "../ui/Input";
import { KycDashboardProps } from "@/app/types/type";
import { FaCamera } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Form = ({ onChange, value, error, onScan, isLoading, isValid }: KycDashboardProps) => {
    return (
        <form className="space-y-4">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input
                        type="text"
                        placeholder="e.g. ABCDE1234F"
                        className={`w-full font-mono tracking-widest uppercase pr-10 transition-all ${error ? "border-red-400 focus:ring-red-200" : ""
                            }`}
                        value={value}
                        onChange={onChange}
                        maxLength={10}
                        autoComplete="off"
                        spellCheck={false}
                        inputMode="text"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-300">
                        {value.length}/10
                    </span>
                </div>
                <motion.button
                    type="button"
                    aria-label="Scan PAN card with camera"
                    onClick={onScan}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    disabled={isLoading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition hover:border-[#046A38] hover:text-[#046A38] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <FaCamera className="h-4 w-4" />
                </motion.button>

            </div>
            <AnimatePresence>
                {error ? (
                    <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-500"
                        role="alert"
                    >
                        {error}
                    </motion.p>
                ) : null}
            </AnimatePresence>
            <p className="text-xs text-gray-400">
                Format: 5 letters · 4 digits · 1 letter · e.g. <span className="font-mono text-gray-500">ABCDE1234F</span>
            </p>
            <motion.button
                type="submit"
                disabled={!isValid || isLoading}
                whileHover={{ scale: isValid ? 1.02 : 1 }}
                whileTap={{ scale: isValid ? 0.98 : 1 }}
                className="relative mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-[#046A38] text-sm font-semibold text-white shadow-md transition hover:bg-[#035530] disabled:cursor-not-allowed disabled:opacity-40"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Verifying…
                    </span>
                ) : (
                    "Submit for Verification"
                )}
            </motion.button>
        </form>
    );
};

export default Form;