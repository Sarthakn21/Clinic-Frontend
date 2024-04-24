import AddPatientForm from "../AddPatientForm/AddPatientForm";
import { useState } from "react";
import { Modal } from "@mui/material";

const AddPatientModal = ({ isOpen, onClose, onSubmit }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal open={isOpen} onClose={handleCloseModal}>
            <AddPatientForm onSubmit={onSubmit} onClose={onClose} />
        </Modal>
    );
};

export default AddPatientModal;

