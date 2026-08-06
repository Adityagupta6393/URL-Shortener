import UrlRow from "./UrlRow";
import { useState } from "react";
import QrCodeModal from "./QrCodeModal";

function UrlTable({ urls, onRefresh }) {

    const [qrOpen, setQrOpen] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState(null);

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr className="text-left text-gray-600 text-sm">

                            <th className="px-6 py-4">
                                Short URL
                            </th>

                            <th className="px-6 py-4">
                                Original URL
                            </th>

                            <th className="px-6 py-4">
                                Clicks
                            </th>

                            <th className="px-6 py-4">
                                Status
                            </th>

                            <th className="px-6 py-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {urls.map((url) => (

                            <UrlRow
                                key={url._id}
                                url={url}
                                onRefresh={onRefresh}
                                setQrOpen={setQrOpen}
                                setSelectedUrl={setSelectedUrl}
                            />

                        ))}

                    </tbody>

                </table>

            </div>

            <QrCodeModal
                open={qrOpen}
                onClose={() => setQrOpen(false)}
                urlId={selectedUrl?._id}
                shortUrl={selectedUrl?.shortUrl}
            />

        </div>
    );
}

export default UrlTable;