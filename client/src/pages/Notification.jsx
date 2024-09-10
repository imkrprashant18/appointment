import { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { API } from "../providers/request";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // Set "Mark All Read" as the default active tab
  const [activeTab, setActiveTab] = useState("mark");
  // get al notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await API.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        console.log(res.data);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // delete all notification
  const handleDeleteAllRead = async () => {
    try {
      const res = await API.post(
        "/api/v1/user/delete-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="px-8 py-6">
        <h1 className="text-xl font-bold text-teal-500 mb-6">Notifications</h1>

        {/* Tabs for "Mark All Read" and "Delete All Read" */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("mark")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "mark"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
          >
            Mark All Read
          </button>
          <button
            onClick={() => setActiveTab("delete")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "delete"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
          >
            Delete All Read
          </button>
        </div>

        {/* Conditionally render content based on the active tab */}
        <div className="bg-gray-100 p-4 rounded-md">
          {activeTab === "mark" ? (
            <div className="space-y-2">
              <h2
                className="text-teal-600 cursor-pointer"
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </h2>
              {user?.notification?.map((notificationMsg) => (
                <>
                  <p
                    className="text-gray-200 shadow p-2 rounded-md bg-lime-700"
                    onClick={() => navigate(notificationMsg.onClickPath)}
                  >
                    {notificationMsg.message}
                  </p>
                </>
              ))}
            </div>
          ) : (
            <div>
              <h2
                className="text-teal-600 cursor-pointer"
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </h2>
              {user?.seennotification?.map((notificationMessage) => (
                <>
                  <p
                    className="text-gray-200 shadow p-2 rounded-md bg-lime-700"
                    onClick={() => navigate(notificationMessage.onClickPath)}
                  >
                    {notificationMessage.message}
                  </p>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notification;
