import {
    MdDashboard,
} from "react-icons/md";

import {
    FiLink,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";

import { HiOutlineChartBar } from "react-icons/hi";

import { FaRegUser } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { logout } = useAuth();

    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
        }`;

    return (
        <aside className="w-64 bg-white border-r h-[calc(100vh-64px)] p-4 flex flex-col">

            <nav className="space-y-2">

                <NavLink
                    to="/dashboard"
                    className={navClass}
                >
                    <MdDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/my-urls"
                    className={navClass}
                >
                    <FiLink size={20} />
                    My URLs
                </NavLink>

                <NavLink
                    to="/dashboard-analytics"
                    className={navClass}
                >
                    <HiOutlineChartBar size={20} />
                    Analytics
                </NavLink>

                <NavLink
                    to="/profile"
                    className={navClass}
                >
                    <FaRegUser size={18} />
                    Profile
                </NavLink>

                <NavLink
                    to="/settings"
                    className={navClass}
                >
                    <FiSettings size={20} />
                    Settings
                </NavLink>

            </nav>

            <button
                onClick={logout}
                className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
            >
                <FiLogOut size={20} />
                Logout
            </button>

        </aside>
    );
}

export default Sidebar;