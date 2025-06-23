"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaFacebook, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  return (
    <div className="mx-auto flex items-center justify-center p-4 max-lg:p-0 max-lg:flex-1 max-lg:w-full max-w-[500px]">
      <div className="min-w-[500px] w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-fifth dark:bg-gray-30 max-lg:min-w-[400px] max-sm:min-w-full">
        <div className="bg-gradient-to-r from-[#121618] to-[#1e2528] p-10 text-center relative mb-5 dark:from-[#1e2528] max-lg:p-5 max-lg:mb-2">
          <h1 className="text-3xl font-bold text-third relative max-lg:text-xl">
            Welcome back
          </h1>
          <p className="text-[#29b1b2] mt-2 relative max-lg:text-sm max-lg:mt-0">
            Login with your social account
          </p>
        </div>
        <form className="px-8 pb-8 max-lg:px-3 max-lg:pb-3 max-lg:text-sm">
          <div className="mb-6 max-lg:mb-2">
            <label
              htmlFor="username"
              className="block text-primary dark:text-third font-medium mb-2 max-lg:mb-1"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 max-lg:size-3 text-gray-400" />
              </div>
              <input
                id="username"
                className="pl-10 w-full px-4 py-3 max-lg:pl-7 max-lg:py-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Username"
                autoComplete="usename"
                required
              />
            </div>
          </div>
          <div className="mb-8 max-lg:mb-3">
            <label
              htmlFor="password"
              className="block text-primary dark:text-third font-medium mb-2 max-lg:mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400 max-lg:size-3" />
              </div>
              <input
                type="password"
                id="password"
                className="pl-10 w-full px-4 py-3 max-lg:pl-7 max-lg:py-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6 max-lg:mb-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#29b1b2] focus:ring-[#29b1b2] border-gray-300 rounded max-lg:size-3"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-primary dark:text-third max-lg:!text-[13px]"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#29b1b2] max-lg:!text-[13px]"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 max-lg:py-2 text-third font-medium rounded-lg mb-6 shadow-md bg-secondary hover:-translate-y-[2px] hover:shadow-[0_5px_15px_-3px_rgba(41,177,178,0.4)] transition-all duration-300 ease-in-out max-lg:mb-2"
          >
            Sign In
          </button>
          <div className="relative mb-6 max-lg:mb-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm max-lg:!text-[13px]">
              <span className="px-2 bg-third text-gray-500 dark:bg-primary">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg font-medium text-primary dark:text-third focus:outline-none max-lg:py-1 relative overflow-hidden transition-all duration-300 ease-in-out"
              onClick={() => {
                signIn("google", { callbackUrl: "/home" });
              }}
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Google
              <span className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-third/20 to-transparent transition-all duration-500 ease-in-out"></span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2.5 max-lg:py-1 px-4 bg-[#3b5998] text-third rounded-lg font-medium focus:outline-none relative overflow-hidden transition-all duration-300 ease-in-out"
              onClick={() => {
                signIn("facebook", { callbackUrl: "/home" });
              }}
            >
              <FaFacebook className="w-5 h-5 mr-2" />
              Facebook
              <span className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-third/20 to-transparent transition-all duration-500 ease-in-out"></span>
            </button>
          </div>
          <div className="mt-6 text-center text-sm max-lg:mt-2 max-lg:!text-[13px]">
            <p className="text-gray-600 dark:text-fifth">
              {`Don't have an account?`}
              <Link href="/sign-up" className="font-medium text-[#29b1b2]">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
