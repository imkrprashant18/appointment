import {
  House,
  Armchair,
  BriefcaseMedical,
  ClipboardPlus,
  Users,
  UserRoundPen,
} from "lucide-react";
export const iconMap = {
  House,
  Armchair,
  BriefcaseMedical,
  ClipboardPlus,
  Users,
  UserRoundPen,
};
export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: "House",
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: "Armchair",
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: "BriefcaseMedical",
  },
];

export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: "House",
  },
  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: "ClipboardPlus",
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: "Users",
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: "UserRoundPen",
  },
];

export const doctorMenu = [
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
    path: "/doctor/profile",
    icon: "UserRoundPen",
  },
];
