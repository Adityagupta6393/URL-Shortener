import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function DangerZoneCard() {

    const handleDeleteAccount = () => {

        toast("Delete Account feature coming soon 🚀");

    };

    return (

        <div className="bg-white rounded-xl shadow border border-red-200 p-6">

            <div className="flex items-center gap-3 mb-4">

                <FiAlertTriangle
                    className="text-red-600"
                    size={24}
                />

                <h2 className="text-xl font-semibold text-red-600">

                    Danger Zone

                </h2>

            </div>

            <p className="text-gray-600 mb-6">

                Deleting your account is permanent.
                All URLs and analytics will be removed forever.

            </p>

            <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >

                Delete Account

            </button>

        </div>

    );

}

export default DangerZoneCard;