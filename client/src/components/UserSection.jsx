import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserSection = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  // Assuming unread notifications have a flag, for example, "isRead: false"
  const unreadNotifications = user?.notification.length;

  return (
    <div className="h-16 w-full flex justify-end items-center pr-8 text-teal-500 shadow bg-white">
      <div className="flex space-x-4 items-center">
        {/* Notification Bell with Badge */}
        <div
          className="relative cursor-pointer"
          onClick={() => {
            navigate("/notification");
          }}
        >
          <Bell className="h-6 w-6" />

          {/* Notification Badge */}
          {unreadNotifications > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center">
              {/* Badge ping animation */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              {/* Badge number */}
              <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-red-500 text-white text-xs">
                {unreadNotifications}
              </span>
            </span>
          )}
        </div>

        {/* User Name */}
        <h1 className="cursor-pointer">{user?.name}</h1>
      </div>
    </div>
  );
};

export default UserSection;
