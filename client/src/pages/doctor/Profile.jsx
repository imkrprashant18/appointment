import { useState, useEffect } from "react";
import { API } from "../../providers/request";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

const Profile = () => {
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    timings: {
      from: "",
      to: "",
    },
  });

  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      const res = await API.post(
        "/api/v1/doctor/getDoctorInfo",
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "from" || name === "to") {
      setDoctor({
        ...doctor,
        timings: { ...doctor.timings, [name]: value },
      });
    } else {
      setDoctor({ ...doctor, [name]: value });
    }
  };

  return (
    <Layout>
      <h1 className="text-teal-500 text-xl text-center py-4">
        Doctor Profile Information
      </h1>
      <form className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={doctor.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={doctor.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={doctor.website}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={doctor.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={doctor.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Fee per Consultation */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Fee per Consultation
            </label>
            <input
              type="text"
              name="feePerConsultation"
              value={doctor.feePerConsultation}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>

          {/* Timings From */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Timings From
            </label>
            <input
              type="text"
              name="from"
              value={doctor.timings.from}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            />
          </div>

          {/* Timings To */}
          <div>
            <label className="block text-sm font-medium text-teal-500">
              Timings To
            </label>
            <input
              type="text"
              name="to"
              value={doctor.timings.to}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              readOnly
            />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Profile;
