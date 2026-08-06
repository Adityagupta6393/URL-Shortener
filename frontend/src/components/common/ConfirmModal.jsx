import Modal from "./Modal";

function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title,
    message,
    loading = false,
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-6">

                <p className="text-gray-600">
                    {message}
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </button>

                </div>

            </div>
        </Modal>
    );
}

export default ConfirmModal;