import { useState } from "react";
import Input from "./Input";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../providers/request";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (data) => {
    data.preventDefault();
    try {
      const res = await API.post("/api/v1/user/register", formData);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-base font-medium text-teal-500"
            >
              Full Name
            </label>
            <div className="mt-2">
              <Input
                id="name"
                placeholder="Enter your name"
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base font-medium text-teal-500"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-base font-medium text-teal-500"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-teal-500 hover:text-teal-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 bg-[#f97171] text-white hover:bg-[#f97171]/80"
            >
              Create Account <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
