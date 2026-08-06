import { getInitials } from "../../utils/getInitials";
import { formatDate } from "../../utils/formatDate";

function ProfileInfoCard({ user }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex flex-col items-center">

                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600">

                    {getInitials(user.name)}

                </div>

                <h2 className="text-2xl font-semibold mt-4">
                    {user.name}
                </h2>

                <p className="text-gray-500">
                    {user.email}
                </p>

            </div>

            <div className="mt-8 space-y-4">

                <InfoRow
                    label="Role"
                    value={user.role}
                />

                <InfoRow
                    label="Email Status"
                    value={
                        user.isVerified
                            ? <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                                Verified

                            </span>
                            : <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                                Not Verified
                            </span>

                    }
                />

                <InfoRow
                    label="Joined"
                    value={formatDate(user.createdAt)}
                />

            </div>

        </div>

    );

}

function InfoRow({ label, value }) {

    return (

        <div className="flex justify-between border-b pb-2">

            <span className="font-medium text-gray-600">
                {label}
            </span>

            <span>
                {value}
            </span>

        </div>

    );

}

export default ProfileInfoCard;