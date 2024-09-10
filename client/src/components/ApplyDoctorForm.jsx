import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "./Input";
import { API } from "../providers/request";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const ApplyDoctorForm = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    fromTime: "",
    toTime: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (all fields are required)
    const isFormValid = Object.values(formData).every((field) => field !== "");
    if (!isFormValid) {
      console.log("Please fill in all fields");
      return;
    }
    const timings = {
      from: formData.fromTime,
      to: formData.toTime,
    };
    try {
      dispatch(showLoading());
      const res = await API.post(
        "/api/v1/user/apply-doctor",
        {
          ...formData,
          userID: user._id,
          timings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.success || "Doctor account has been applied");
      } else {
        toast.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-8 py-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h1 className="text-teal-500 text-xl mb-4">Personal Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="firstName" className="text-teal-700">
                First Name
              </label>
              <Input
                type="text"
                placeholder="First Name"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-teal-700">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Last Name"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-teal-700">
                Phone No.
              </label>
              <Input
                type="text"
                placeholder="Phone No."
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-teal-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="Email Address"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="website" className="text-teal-700">
                Website
              </label>
              <Input
                type="text"
                placeholder="Your Website"
                id="website"
                value={formData.website}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="text-teal-700">
                Address
              </label>
              <Input
                type="text"
                placeholder="Address"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Professional Details */}
          <h1 className="text-teal-500 text-xl mb-4">Professional Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="specialization" className="text-teal-700">
                Specialization
              </label>
              <Input
                type="text"
                placeholder="Specialization"
                id="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="experience" className="text-teal-700">
                Experience
              </label>
              <Input
                type="text"
                placeholder="Experience"
                id="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="feePerConsultation" className="text-teal-700">
                Fee Per Consultation
              </label>
              <Input
                type="text"
                placeholder="Fee Per Consultation"
                id="feePerConsultation"
                value={formData.feePerConsultation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="timings" className="text-teal-700">
                Timings (From - To)
              </label>
              <div className="flex space-x-4">
                <Input
                  type="time"
                  id="fromTime"
                  placeholder="From"
                  value={formData.fromTime}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="time"
                  id="toTime"
                  placeholder="To"
                  value={formData.toTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex sm:justify-end justify-center items-center pr-12">
            <button
              type="submit"
              className="inline-flex w-32 items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 bg-[#f97171] text-white hover:bg-[#f97171]/80"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyDoctorForm;
