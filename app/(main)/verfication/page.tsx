"use client";

import KycDashboard from "@/app/components/layout/KycDashboard";
import { panSchema } from "@/app/lib/validation/validationSchema";
import { dynamicImport, LazyLoadImage } from "@/app/utils/common";
import {  PAN_REGEX } from "@/app/utils/types";

import { useCallback, useState } from "react";
// ── Animation variants ──────────────────────────────────────────────

const LazyComponent = dynamicImport(() => import("../../components/layout/WebCam"), { ssr: false }, "Loading camera...");

// ── Main Component ───────────────────────────────────────────────────
const Verification = () => {
  const [panNumber, setPanNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  // const [Mobile, setIsMobile] = useState(false);
  const [error, setError] = useState("");

  const isValid = PAN_REGEX.test(panNumber) && panNumber.length === 10;
    // useEffect(() => {        
    //     setIsMobile(isMobile);
    // }, []);
    
  const handleScan = useCallback(() => {
    // TODO: trigger camera / document scanner
    setShow(true);
  }, []);

  // const handlePanChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const val = e.target.value.toUpperCase().slice(0, 10);
  //     setPanNumber(val);
  //     setError(val.length > 0 && !PAN_REGEX.test(val) ? "Invalid PAN format" : "");
  //   },
  //   []
  // );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setPanNumber(value);
    // validate only when length > 0
    const result = panSchema.safeParse({ panNumber: value });
    if (!result.success) {
      setError(result.error.flatten().fieldErrors.panNumber?.[0] || "");
    } else {
      setError("");
    }
  };

  // const handleSubmit = useCallback(
  //   async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (!isValid) return;
  //     setIsLoading(true);
  //     // await new Promise((r) => setTimeout(r, 1500)); // simulate API
  //     setIsLoading(false);
  //     setSubmitted(true);
  //   },
  //   [isValid]
  // );
 const handleSubmit = useCallback(async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      panNumber: formData.get("panNumber"),
    };
    const result = panSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.flatten().fieldErrors.panNumber?.[0] || "");
      return;
    }
    setError("");
    console.log("Valid PAN:", result.data.panNumber);
  },[isValid]);

  return (
    <KycDashboard 
    show={show}
    heading="PAN Verification"
    onChange={handleChange}
    value={panNumber}
    error={error}
    isValid={isValid}
    onScan={handleScan}
    img="/image/pan_card.jpg"
    isLoading={isLoading}
    LazyComponent={LazyComponent}    
    LazyLoadImage={LazyLoadImage}    
    description="Please add PAN number and wait for the verification"/>
  
  );
};
export default Verification;
