function RecentActivity({ activities = [] }) {

    return (

        <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold mb-4">
                Recent Activity
            </h2>

            {activities.length === 0 ? (

                <p className="text-gray-500">
                    No recent activity.
                </p>

            ) : (

                <div className="space-y-4">

                    {activities.map((activity, index) => (

                        <div
                            key={index}
                            className="border-b pb-3"
                        >

                            <p className="font-semibold">
                                {activity.shortCode}
                            </p>

                            <p className="text-sm text-gray-600">
                                {activity.browser} • {activity.os} • {activity.device}
                            </p>

                            <p className="text-sm text-gray-500">
                                {activity.city}, {activity.country}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(activity.clickedAt).toLocaleString()}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default RecentActivity;