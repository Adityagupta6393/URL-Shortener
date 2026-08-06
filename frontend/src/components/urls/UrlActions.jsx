import { FiCopy, FiBarChart2 } from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteUrlButton from "./DeleteUrlButton";

function UrlActions({ url, shortUrl, onRefresh, setQrOpen, setSelectedUrl }) {

    const navigate = useNavigate();

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(shortUrl);

            toast.success("Short URL copied!");

        } catch (error) {

            toast.error("Failed to copy URL");

        }

    };

    const handleAnalytics = () => {

        navigate(`/analytics/${url._id}`);

    };

    const handleQr = () => {

        setSelectedUrl(url);
        setQrOpen(true);

    };

    const handleDelete = () => {

        toast("Delete feature coming next!");

    };

    return (

        <div className="flex items-center gap-3">

            <button
                onClick={handleCopy}
                className="text-gray-600 hover:text-blue-600 transition"
                title="Copy URL"
            >
                <FiCopy size={18} />
            </button>

            <button
                onClick={handleQr}
                className="text-gray-600 hover:text-green-600 transition"
                title="QR Code"
            >
                <LuQrCode size={18} />
            </button>

            <button
                onClick={handleAnalytics}
                className="text-gray-600 hover:text-purple-600 transition"
                title="Analytics"
            >
                <FiBarChart2 size={18} />
            </button>

            {/* <button
                onClick={handleDelete}
                className="text-gray-600 hover:text-red-600 transition"
                title="Delete"
            >
                <FiTrash2 size={18} />
            </button> */}
            <DeleteUrlButton
                urlId={url._id}
                onRefresh={onRefresh}
            />

        </div>

    );

}

export default UrlActions;