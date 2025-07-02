"use client";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { FaFacebook, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import InputField from "~/components/ui/inputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "~/schemas/user";
import { toastError, toastUser } from "~/components/ui/toastGlobal";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: SignInFormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (res?.ok) {
      const session = await getSession();
      if (session && session.user) {
        toastUser({ session, id: "sign-in-success" });
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    } else {
      toastError({
        message: "Invalid username or password",
        id: "sign-in-error",
      });
    }
  };

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 pb-8 max-lg:px-3 max-lg:pb-3 max-lg:text-sm"
        >
          <InputField
            id="username"
            label="Username"
            placeholder="Username"
            auto_complete="username"
            icon={<FaUser className="size-full" />}
            register={register("username", {
              required: "Username is required",
            })}
            error={errors.username?.message}
          />

          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            auto_complete="current-password"
            icon={<FaLock className="size-full" />}
            register={register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />

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
              onClick={() => signIn("google", { callbackUrl: "/home" })}
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2.5 max-lg:py-1 px-4 bg-[#3b5998] text-third rounded-lg font-medium focus:outline-none relative overflow-hidden transition-all duration-300 ease-in-out"
              onClick={() => signIn("facebook", { callbackUrl: "/home" })}
            >
              <FaFacebook className="w-5 h-5 mr-2" />
              Facebook
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
