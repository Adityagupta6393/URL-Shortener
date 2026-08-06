import { useAuth } from "../../context/AuthContext";

import ProfileInfoCard from "../../components/profile/ProfileInfoCard";
import ProfileForm from "../../components/profile/ProfileForm";

function Profile() {

    const { user, loading } = useAuth();

    if (loading) {

        return (
            <div className="text-center py-20">
                Loading...
            </div>
        );

    }

    return (

        <div className="space-y-8">

            <h1 className="text-3xl font-bold">

                Profile

            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <ProfileInfoCard
                    user={user}
                />

                <div className="lg:col-span-2">

                    <ProfileForm
                        user={user}
                    />

                </div>

            </div>

        </div>

    );

}

export default Profile;