import ChangePasswordCard from "../../components/settings/ChangePasswordCard";
import SessionCard from "../../components/settings/SessionCard";
import DangerZoneCard from "../../components/settings/DangerZoneCard";

function Settings() {

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Settings

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage your account settings.

                </p>

            </div>

            <ChangePasswordCard />

            <SessionCard />

            <DangerZoneCard />

        </div>

    );

}

export default Settings;