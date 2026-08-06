import { FiExternalLink } from "react-icons/fi";

function TopUrlsTable({ urls }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                Top Performing URLs
            </h2>

            {urls.length === 0 ? (

                <p className="text-gray-500">
                    No clicks yet.
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
                                    Original URL
                                </th>

                                <th className="py-3 text-center">
                                    Clicks
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {urls.map((url) => (

                                <tr
                                    key={url._id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="py-4">

                                        <a
                                            href={`${import.meta.env.VITE_SHORT_URL}/${url.shortCode}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline flex items-center gap-2"
                                        >
                                            {url.shortCode}

                                            <FiExternalLink size={15} />

                                        </a>

                                    </td>

                                    <td className="py-4 max-w-sm truncate">

                                        <a
                                            href={url.originalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-600"
                                        >
                                            {url.originalUrl}
                                        </a>

                                    </td>

                                    <td className="text-center font-semibold">

                                        {url.totalClicks}

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

export default TopUrlsTable;