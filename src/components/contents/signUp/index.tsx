"use client";
import Link from "next/link";
import { FaLock, FaUser } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData, signUpSchema } from "~/schemas/user";
import { createUserAction } from "~/actions/user";
import InputField from "~/components/ui/inputField";

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
          <InputField
            id="display-name"
            label="Display Name"
            placeholder="Display Name"
            auto_complete="name"
            icon={<ImProfile className="size-full" />}
            register={register("displayName")}
            error={errors.displayName?.message}
          />

          <InputField
            id="username"
            label="Username"
            placeholder="Username"
            auto_complete="username"
            icon={<FaUser className="size-full" />}
            register={register("username")}
            error={errors.username?.message}
          />

          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            auto_complete="new-password"
            icon={<FaLock className="size-full" />}
            register={register("password")}
            error={errors.password?.message}
          />

          <InputField
            id="confirm-password"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            auto_complete="new-password"
            icon={<FaLock className="size-full" />}
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

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
