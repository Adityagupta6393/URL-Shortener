function TopUrls({ urls = [] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold mb-4">
                Top URLs
            </h2>

            {urls.length === 0 ? (
                <p className="text-gray-500">
                    No URLs found.
                </p>
            ) : (
                <div className="space-y-4">

                    {urls.map((url) => (
                        <div
                            key={url.shortCode}
                            className="border-b pb-3"
                        >

                            <p className="font-semibold text-blue-600">
                                {url.shortCode}
                            </p>

                            <p className="text-sm text-gray-500 truncate">
                                {url.originalUrl}
                            </p>

                            <p className="text-sm mt-1">
                                {url.totalClicks} Clicks
                            </p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default TopUrls;