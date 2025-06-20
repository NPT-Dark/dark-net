import { FaFacebook, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="min-w-[500px] w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-fifth dark:bg-gray-30">
        <div className="bg-gradient-to-r from-[#121618] to-[#1e2528] p-10 text-center relative mb-5 dark:from-[#1e2528]">
          <h1 className="text-3xl font-bold text-third relative">
            Welcome back
          </h1>
          <p className="text-[#29b1b2] mt-2 relative">
            Login with your social account
          </p>
        </div>
        <form className="px-8 pb-8">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-primary dark:text-third font-medium mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="pl-10 w-full px-4 py-3 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-primary dark:text-third font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                className="pl-10 w-full px-4 py-3 border border-sixth rounded-lg focus:outline-none focus:border-secondary"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#29b1b2] focus:ring-[#29b1b2] border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-primary dark:text-third"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-[#29b1b2]">
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-third font-medium rounded-lg mb-6 shadow-md bg-secondary hover:-translate-y-[2px] hover:shadow-[0_5px_15px_-3px_rgba(41,177,178,0.4)] transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-third text-gray-500 dark:bg-primary">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg font-medium text-primary dark:text-third focus:outline-none relative overflow-hidden transition-all duration-300 ease-in-out"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Google
              <span className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-third/20 to-transparent transition-all duration-500 ease-in-out"></span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 bg-[#3b5998] text-third rounded-lg font-medium focus:outline-none relative overflow-hidden transition-all duration-300 ease-in-out"
            >
              <FaFacebook className="w-5 h-5 mr-2" />
              Facebook
              <span className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-third/20 to-transparent transition-all duration-500 ease-in-out"></span>
            </button>
          </div>
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 dark:text-fifth">
              {`Don't have an account?`}
              <a href="#" className="font-medium text-[#29b1b2]">
                {" "}
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
