import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { API } from "../../providers/request";

const UserTable = () => {
  const [users, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await API.get("/api/v1/admin/getAllUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Layout>
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow rounded-md">
              <thead>
                <tr className="bg-teal-500 border-b rounded-md">
                  <th className="text-left p-4 text-gray-600 font-semibold">
                    Name
                  </th>
                  <th className="text-left p-4 text-gray-600 font-semibold">
                    Email
                  </th>
                  <th className="text-left p-4 text-gray-600 font-semibold">
                    Title
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.isDoctor ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserTable;
