import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 sm:flex hidden">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-lg object-cover object-top"
              src="https://cdn.pixabay.com/photo/2017/01/31/22/32/cartoon-2027771_1280.png"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
                SignUp to The Doctor Management App
              </h3>
            </div>
          </div>
        </div>
        {/* form */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-teal-500 sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                title=""
                className="font-medium text-teal-500 transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            {/* form */}
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
