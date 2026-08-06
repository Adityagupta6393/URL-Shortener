import { useEffect, useState } from "react";

import { getMyUrls } from "../../api/url.api";

import UrlTable from "../../components/urls/UrlTable";
import EmptyState from "../../components/urls/EmptyState";

function MyUrls() {

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    const [qrOpen, setQrOpen] = useState(false);

    const [selectedUrl, setSelectedUrl] = useState(null);

    const fetchUrls = async () => {

        try {

            const response = await getMyUrls();

            setUrls(response.data || []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUrls();

    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                Loading URLs...
            </div>
        );
    }

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        My URLs
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all your shortened links.
                    </p>

                </div>

            </div>

            {urls.length === 0 ? (
                <EmptyState />
            ) : (
                <UrlTable urls={urls} onRefresh={fetchUrls} />
            )}


        </div>

    );
}

export default MyUrls;