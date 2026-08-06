import toast from "react-hot-toast";

import { logoutAll } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function SessionCard() {

    const { logout } = useAuth();

    const handleLogoutAll = async () => {

        try {

            const response =
                await logoutAll();

            toast.success(response.message);

            logout();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to logout"
            );

        }

    };

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold">

                Sessions

            </h2>

            <p className="text-gray-500 mt-2 mb-6">

                Logout from all logged in devices.

            </p>

            <button
                onClick={handleLogoutAll}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
            >

                Logout All Devices

            </button>

        </div>

    );

}

export default SessionCard;