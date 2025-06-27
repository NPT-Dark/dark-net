"use client";
import Link from "next/link";
import { FaLock, FaUser } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData, signUpSchema } from "~/schemas/user";
import { createUserAction } from "~/actions/user";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      const rs = await createUserAction(data);
      console.log(rs);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="mx-auto flex items-center justify-center p-4 max-lg:p-0 max-lg:flex-1 max-lg:w-full max-w-[500px]">
      <div className="min-w-[500px] w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-fifth dark:bg-gray-30 max-lg:min-w-[400px] max-sm:min-w-full">
        <div className="bg-gradient-to-r from-[#121618] to-[#1e2528] p-10 text-center relative mb-5 dark:from-[#1e2528] max-lg:p-5 max-lg:mb-2">
          <h1 className="text-3xl font-bold text-third relative max-lg:text-xl">
            Let’s get started!
          </h1>
          <p className="text-[#29b1b2] mt-2 relative max-lg:text-sm max-lg:mt-0">
            Sign up with your social account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 pb-8 max-lg:px-3 max-lg:pb-3 max-lg:text-sm"
        >
          {/* Display Name */}
          <div className="mb-6 max-lg:mb-2">
            <label
              htmlFor="display-name"
              className="block text-primary dark:text-third font-medium mb-2 max-lg:mb-1"
            >
              Display Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImProfile className="h-5 w-5 max-lg:size-3 text-gray-400" />
              </div>
              <input
                id="display-name"
                {...register("displayName")}
                className="pl-10 w-full px-4 py-3 max-lg:pl-7 max-lg:py-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Display Name"
              />
            </div>
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Username */}
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
                {...register("username")}
                className="pl-10 w-full px-4 py-3 max-lg:pl-7 max-lg:py-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
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
                {...register("password")}
                className="pl-10 w-full px-4 py-3 max-lg:pl-7 max-lg:py-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Password"
                autoComplete="new-password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-8 max-lg:mb-3">
            <label
              htmlFor="confirm-password"
              className="block text-primary dark:text-third font-medium mb-2 max-lg:mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400 max-lg:size-3" />
              </div>
              <input
                type="password"
                id="confirm-password"
                {...register("confirmPassword")}
                className="pl-10 w-full px-4 py-3 max-lg:pl-7 max-lg:py-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 max-lg:py-2 text-third font-medium rounded-lg shadow-md bg-secondary hover:-translate-y-[2px] hover:shadow-[0_5px_15px_-3px_rgba(41,177,178,0.4)] transition-all duration-300 ease-in-out"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center text-sm max-lg:mt-2 max-lg:!text-[13px]">
            <p className="text-gray-600 dark:text-fifth">
              Already have an account?
              <Link href="/sign-in" className="font-medium text-[#29b1b2]">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
