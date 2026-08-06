import UrlStatusBadge from "./UrlStatusBadge";
import UrlActions from "./UrlActions";

function UrlRow({ url, onRefresh, setQrOpen, setSelectedUrl }) {

    const shortUrl = `${import.meta.env.VITE_SHORT_URL}/${url.shortCode}`;

    return (

        <tr className="border-t hover:bg-gray-50 transition">

            {/* Short URL */}

            <td className="px-6 py-4">

                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                >
                    {url.shortCode}
                </a>

            </td>

            {/* Original URL */}

            <td className="px-6 py-4 max-w-sm">

                <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 truncate block"
                >
                    {url.originalUrl}
                </a>

            </td>

            {/* Click Count */}

            <td className="px-6 py-4">

                {url.clickCount}

            </td>

            {/* Status */}

            <td className="px-6 py-4">

                <div className="flex items-center gap-2">

                    <UrlStatusBadge
                        active={url.isActive}
                    />

                    {url.isPasswordProtected && (

                        <span
                            className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700"
                        >
                            🔒 Protected
                        </span>

                    )}

                </div>

            </td>

            {/* Actions */}

            <td className="px-6 py-4">

                <UrlActions
                    url={url}
                    shortUrl={shortUrl}
                    onRefresh={onRefresh}
                    setQrOpen={setQrOpen}
                    setSelectedUrl={setSelectedUrl}
                />

            </td>

        </tr>

    );

}

export default UrlRow;