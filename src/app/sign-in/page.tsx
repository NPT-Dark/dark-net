import type { Metadata } from "next";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export const metadata: Metadata = {
  title: "Dark Net – Log In",
  description:
    "Sign in to Dark Net, the next-gen social platform where AI curates your feed and boosts meaningful connections. Secure, smart, and designed for modern users who want more signal, less static.",
};
export default function Page() {
  return (
    <div className="center-box w-full">
      <form className="h-1/2 w-full max-w-[500px] rounded-lg p-4 border shadow-secondary shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Welcome to Dark Net</h1>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            required
          />
          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
          <div className="flex items-center w-full gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          </div>
          <button
            type="button"
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 font-medium"
          >
            <FcGoogle size={20} className="mr-2" />
            Sign in with Google
          </button>
          <button
            type="button"
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-[#1877f2] border border-[#1877f2] rounded-md py-2 text-white font-medium transition"
          >
            <FaFacebookF size={20} className="mr-2" />
            Sign in with Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
