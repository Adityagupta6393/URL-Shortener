import { useEffect, useState } from "react";
import { FiDownload, FiX } from "react-icons/fi";

import { getQrCode } from "../../api/url.api";

function QrCodeModal({
    open,
    onClose,
    urlId,
    shortUrl,
}) {

    const [loading, setLoading] = useState(false);
    const [qrCode, setQrCode] = useState("");

    useEffect(() => {

        if (!open || !urlId) return;

        fetchQr();

    }, [open, urlId]);

    const fetchQr = async () => {

        try {

            setLoading(true);

            const response = await getQrCode(urlId);

            setQrCode(response.data.qrCode);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const downloadQr = () => {

        const link = document.createElement("a");

        link.href = qrCode;

        link.download = "qr-code.png";

        link.click();

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4"
                >
                    <FiX size={22} />
                </button>

                <h2 className="text-2xl font-bold mb-6">
                    QR Code
                </h2>

                {
                    loading ?

                        (
                            <div className="text-center py-20">
                                Loading...
                            </div>
                        )

                        :

                        (

                            <>

                                <img
                                    src={qrCode}
                                    alt="QR Code"
                                    className="mx-auto rounded-lg border p-2"
                                />

                                <p className="text-center text-gray-500 mt-4 break-all">

                                    {shortUrl}

                                </p>

                                <button
                                    onClick={downloadQr}
                                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                                >

                                    <FiDownload />

                                    Download QR Code

                                </button>

                            </>

                        )

                }

            </div>

        </div>

    );

}

export default QrCodeModal;