import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { API } from "../../providers/request";
import { toast } from "react-toastify";
const Doctor = () => {
  // Example data (replace with real data or API call)
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const res = await API.get("/api/v1/admin/getAllDoctor", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    getAllDoctors();
  }, []);

  //   handle status
  const handleStatus = async (doctor, status) => {
    try {
      const res = await API.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: doctor._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-md">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="border-b">
                  <td className="p-4">
                    {doctor.firstName} {doctor.lastName}
                  </td>
                  <td className="p-4">{doctor.status}</td>
                  <td className="p-4">{doctor.phone}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() => handleStatus(doctor, "approved")}
                      >
                        {doctor.status === "approved" ? "Remove" : "Approve"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Doctor;
