import { useEffect, useState } from "react";
import { API } from "../providers/request";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const res = await API.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="px-8 py-12 space-y-4">
        <h1 className="text-teal-500 text-xl text-center">Doctors List</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id} // Use the unique ID of the doctor (if available) as the key
              className="p-4 border border-teal-500 rounded-lg shadow-md bg-white cursor-pointer"
              onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
            >
              <h2 className="text-teal-700 text-lg font-semibold">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-teal-600">Email: {doctor.email}</p>
              <p className="text-teal-600">Phone: {doctor.phone}</p>
              <p className="text-teal-600">Address: {doctor.address}</p>
              <p className="text-teal-600">
                Experience: {doctor.experience} years
              </p>
              <p className="text-teal-600">
                Specialization: {doctor.specialization}
              </p>
              <p className="text-teal-600">
                Fees per Consultation: {doctor.feePerConsultation}
              </p>
              {doctor.website && (
                <p className="text-teal-600">
                  Website:{" "}
                  <Link
                    to={doctor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 underline"
                  >
                    {doctor.website}
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
