"use client";
import { motion } from "framer-motion";
import { Loader, Mail, Gem,  } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Input from "../../components/ui/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — form panel */}
      <div className="bg-white flex items-center justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div className="flex items-center justify-center mb-4">
            <Gem className="w-8 h-8 text-[#046A38] mr-2" />
            <span className="text-lg font-semibold text-gray-900">GemTrace</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>

          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
            Sign in to access your dashboard and continue manage your shipments
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <motion.button
              className="w-full py-3 px-4 bg-[#046A38] text-white font-bold rounded-lg hover:bg-[#035c30] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign In"
              )}
            </motion.button>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => console.log("Google signup clicked")}
              >
                <FaGoogle className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => console.log("Apple signup clicked")}
              >
                <FaApple className="w-4 h-4" />
                <span>Continue with Apple</span>
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#046A38] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right — brand panel */}
      <div className="bg-[#046A38] relative overflow-hidden flex items-center lg:items-center justify-start px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 order-1 lg:order-2 min-h-[280px] sm:min-h-[340px] lg:min-h-screen">
        {/* Optional blob effects */}
     
        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-[662px] text-left">
          <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h3>

          <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;