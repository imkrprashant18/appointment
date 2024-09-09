import { useState } from "react";
import Input from "./Input";
import { ArrowRight } from "lucide-react";
import { API } from "../providers/request";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length === 0 && formData.password.length === 0) {
      toast.error("Please enter your email and password");
      setMessage("Please enter your email and password");
      return;
    }
    try {
      dispatch(showLoading());
      const res = await API.post("/api/v1/user/login", formData);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
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
            {message && <p className="text-red-500 text-sm">{message}</p>}
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
            {message && <p className="text-red-500 text-sm">{message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 bg-[#f97171] text-white hover:bg-[#f97171]/80"
            >
              Login <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
