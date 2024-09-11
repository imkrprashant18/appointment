import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { userMenu, iconMap, adminMenu } from "../data/Data";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export function SidebarOne() {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully");
    console.log("Logout clicked");
  };

  // array for doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "House",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "Armchair",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "UserRoundPen",
    },
  ];

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <div>
      {/* Toggle button for small screens */}
      <button
        className="fixed top-4 left-4 block md:hidden p-2 text-gray-200 bg-teal-500 rounded-full shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 flex-col overflow-y-auto border-r bg-teal-500 px-5 py-8 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64 md:flex md:flex-col md:overflow-y-auto`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-white text-md font-bold">
            Welcome! {user?.name}
          </h2>
          <button
            className="md:hidden p-2 text-gray-300 hover:text-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6 text-gray-200" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6">
            <div className="space-y-3">
              {SidebarMenu.map((menuItem, index) => {
                // Dynamically get the icon component from iconMap using the string key
                const IconComponent = iconMap[menuItem.icon];

                // Check if the current path matches the menu item path
                const isActive = location.pathname === menuItem.path;

                return (
                  <Link
                    key={index}
                    className={`flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-gray-200 text-gray-800" // Active state
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                    to={menuItem.path}
                  >
                    {/* Render the icon */}
                    {IconComponent && (
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    )}
                    <span className="mx-2 text-sm font-medium">
                      {menuItem.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button */}
          <div className="mt-4">
            <Link
              onClick={handleLogout}
              to=""
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
