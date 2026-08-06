function RecentActivityTable({ activities }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                Recent Activity
            </h2>

            {activities.length === 0 ? (

                <p className="text-gray-500">
                    No recent activity.
                </p>

            ) : (

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="border-b">

                            <tr className="text-left text-gray-600">

                                <th className="py-3">
                                    Short URL
                                </th>

                                <th className="py-3">
                                    Country
                                </th>

                                <th className="py-3">
                                    Browser
                                </th>

                                <th className="py-3">
                                    Device
                                </th>

                                <th className="py-3">
                                    OS
                                </th>

                                <th className="py-3">
                                    Clicked At
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {activities.map((activity, index) => (

                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="py-4 font-medium text-blue-600">

                                        {activity.shortCode}

                                    </td>

                                    <td>

                                        {activity.country}

                                    </td>

                                    <td>

                                        {activity.browser}

                                    </td>

                                    <td>

                                        {activity.device}

                                    </td>

                                    <td>

                                        {activity.os}

                                    </td>

                                    <td>

                                        {new Date(
                                            activity.clickedAt
                                        ).toLocaleString()}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}

export default RecentActivityTable;