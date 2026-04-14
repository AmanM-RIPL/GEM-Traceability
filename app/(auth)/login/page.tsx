"use client";
import { motion } from "framer-motion";
import { Loader, Mail, Gem } from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Input from "../../components/ui/input";
import { signInWithApple, signInWithGoogle } from "@/app/actions/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/app/components/ui/input-otp";
import { ENV } from "@/lib/config";
const checkEnvironment = ENV.isDev ;

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setMessage("Login email sent successfully ✅");
      // setEmail("");
      setStep("otp");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid OTP");
      }
      setMessage("Login successful 🎉");
    } catch (error: any) {
      setMessage(error.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Form */}
      
      <div className="bg-white flex items-center justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 order-2 lg:order-1">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <Gem className="w-8 h-8 text-[#046A38] mr-2" />
            <span className="text-lg font-semibold text-gray-900">
              GemTrace
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>

          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
            Sign in to access your dashboard
          </p>

          {/* ✅ Email Form */}
          {/* onSubmit={handleSignIn} */}
          {/* <form onSubmit={step === "email" ? handleSignIn : handleVerifyOtp}className="space-y-4">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            

            <motion.button
              type="submit"

              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#046A38] text-white font-bold rounded-lg hover:bg-[#035c30]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form> */}
          <form
            onSubmit={step === "email" ? handleSignIn : handleVerifyOtp}
            className="space-y-5"
          >
            {/* EMAIL FIELD */}
            {step === "email" && (
              <Input
                icon={Mail}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            )}

            {/* OTP FIELD */}
            {step === "otp" && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">
                  Enter OTP sent to <span className="font-semibold">{email}</span>
                </p>

                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  className="w-full"
                >
                  <InputOTPGroup className="flex justify-center gap-2">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-12 border rounded-lg text-lg font-bold"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {/* RESEND */}
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-xs text-[#046A38] mt-3 hover:underline"
                >
                  Change Email
                </button>
              </div>
            )}

            {/* BUTTON */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#046A38] text-white rounded-lg font-semibold"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : step === "email" ? (
                "Send OTP"
              ) : (
                "Verify OTP"
              )}
            </motion.button>
          </form>

          {/* ✅ Message */}
          {message && (
            <p className="text-sm text-center mt-3 text-red-500">
              {message}
            </p>
          )}

          {/* Divider */}
         {checkEnvironment && (<div className="my-5 text-center text-gray-400 text-sm">OR</div>)}
          
          {/* ✅ OAuth Buttons */}
         {checkEnvironment && (<div className="space-y-3" >
         
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaGoogle />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => signInWithApple()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaApple />
              Continue with Apple
            </button>
          </div>)}

        </motion.div>
      </div>

      {/* Right — Branding */}
      <div className="bg-[#046A38] flex items-center justify-start px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 order-1 lg:order-2">
        <div className="text-white max-w-md">
          <h3 className="text-3xl font-semibold mb-4">
            Manage your shipments easily
          </h3>
          <p className="text-white/70">
            Track, manage, and optimize your logistics in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;