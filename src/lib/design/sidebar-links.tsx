import {
  FiBell,
  FiHome,
  FiPlusCircle,
  FiSearch,
  FiUser,
  FiUsers,
} from "react-icons/fi";

type sidebarLink = {
  icon: React.ReactNode;
  route: string;
  label: string;
};

export const sidebarLinks: sidebarLink[] = [
  {
    icon: <FiHome />,
    route: "/",
    label: "Home",
  },
  {
    icon: <FiSearch />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <FiBell />,
    route: "/notifications",
    label: "Notifications",
  },
  {
    icon: <FiPlusCircle />,
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    icon: <FiUsers />,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <FiUser />,
    route: "/profile",
    label: "Profile",
  },
];
