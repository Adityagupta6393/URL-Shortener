import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import ConfirmModal from "../common/ConfirmModal";
import { deleteUrl } from "../../api/url.api";

function DeleteUrlButton({ urlId, onRefresh }) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        try {

            setLoading(true);

            const response = await deleteUrl(urlId);

            toast.success(response.message);

            setOpen(false);

            await onRefresh();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete URL"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <>

            <button
                onClick={() => setOpen(true)}
                className="text-gray-600 hover:text-red-600 transition"
                title="Delete URL"
            >
                <FiTrash2 size={18} />
            </button>

            <ConfirmModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                loading={loading}
                title="Delete URL"
                message="Are you sure you want to delete this URL? This action cannot be undone."
            />

        </>
    );
}

export default DeleteUrlButton;