import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import PrescriptionForm from '../PrescriptionForm/PrescriptionForm';

const AddRecordModal = ({ isOpen, onClose, onSubmit }) => {
  const [record, setRecord] = useState({
    name: '',
    age: '',
    gender: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(record);
    setRecord({
      name: '',
      age: '',
      gender: '',
      // Reset other fields as needed
    });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <PrescriptionForm />
    </Modal>
  );
};

export default AddRecordModal;

