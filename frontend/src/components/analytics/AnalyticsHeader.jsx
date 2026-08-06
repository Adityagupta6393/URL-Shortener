import { FiExternalLink } from "react-icons/fi";

function AnalyticsHeader({

    url,

    title = "URL Analytics",

    subtitle = "",

}) {

    // Overall Analytics Page
    if (!url) {

        return (

            <div className="bg-white rounded-xl shadow p-6">

                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                {subtitle && (

                    <p className="text-gray-500 mt-2">
                        {subtitle}
                    </p>

                )}

            </div>

        );

    }

    // Individual URL Analytics Page

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h1 className="text-3xl font-bold mb-6">
                {title}
            </h1>

            <div className="space-y-5">

                <div>

                    <p className="text-sm text-gray-500 mb-1">
                        Short URL
                    </p>

                    <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-2"
                    >
                        {url.shortUrl}

                        <FiExternalLink />

                    </a>

                </div>

                <div>

                    <p className="text-sm text-gray-500 mb-1">
                        Original URL
                    </p>

                    <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-600 break-all"
                    >
                        {url.originalUrl}
                    </a>

                </div>

                <div>

                    <p className="text-sm text-gray-500 mb-1">
                        Short Code
                    </p>

                    <p className="font-semibold">
                        {url.shortCode}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default AnalyticsHeader;