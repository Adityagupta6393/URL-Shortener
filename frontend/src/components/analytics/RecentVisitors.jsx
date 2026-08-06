import {
    FiGlobe,
    FiMonitor,
    FiSmartphone,
    FiClock,
} from "react-icons/fi";

function RecentVisitors({ visitors }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-semibold">
                    Recent Visitors
                </h2>

                <span className="text-sm text-gray-500">
                    {visitors.length} Visits
                </span>

            </div>

            {
                visitors.length === 0 ? (

                    <div className="text-center py-10 text-gray-500">
                        No visitor activity found.
                    </div>

                ) : (

                    <div className="space-y-4">

                        {
                            visitors.map((visitor, index) => (

                                <div
                                    key={index}
                                    className="border rounded-xl p-4 hover:bg-gray-50 transition"
                                >

                                    <div className="flex justify-between items-start">

                                        <div className="space-y-3">

                                            <div className="flex items-center gap-2">

                                                <FiGlobe className="text-blue-600" />

                                                <span className="font-medium">

                                                    {visitor.city || "Unknown"},{" "}
                                                    {visitor.country || "Unknown"}

                                                </span>

                                            </div>

                                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">

                                                <div className="flex items-center gap-1">

                                                    <FiMonitor />

                                                    {visitor.browser}

                                                </div>

                                                <div className="flex items-center gap-1">

                                                    <FiSmartphone />

                                                    {visitor.device}

                                                </div>

                                                <span>
                                                    {visitor.os}
                                                </span>

                                            </div>

                                            {
                                                visitor.referer && (

                                                    <p className="text-sm text-gray-500 break-all">

                                                        Referrer:
                                                        {" "}
                                                        {visitor.referer}

                                                    </p>

                                                )
                                            }

                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500">

                                            <FiClock />

                                            {
                                                new Date(
                                                    visitor.clickedAt
                                                ).toLocaleString()
                                            }

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );

}

export default RecentVisitors;