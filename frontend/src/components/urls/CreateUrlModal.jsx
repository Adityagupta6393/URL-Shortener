import Modal from "../common/Modal";
import UrlForm from "./UrlForm";

function CreateUrlModal({
    open,
    onClose,
    onSuccess,
}) {

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create Short URL"
        >
            <UrlForm
                onClose={onClose}
                onSuccess={onSuccess}
            />
        </Modal>
    );
}

export default CreateUrlModal;