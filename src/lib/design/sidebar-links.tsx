import {
  FiHeart,
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
    icon: <FiHeart />,
    route: "/activity",
    label: "Activity",
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
