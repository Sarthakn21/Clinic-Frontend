import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./PrescriptionForm.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PrescriptionForm = ({ setShowModal, onSubmit }) => {
  const { id } = useParams();
  const patientId = "6616cd3e9ba7e0de5b0f95c1"; // Provided patient ID
  const [medications, setMedications] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [quantity, setQuantity] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const handleAddMedicine = () => {
    setMedications([...medications, { medicineName, frequency, quantity }]);
    setMedicineName("");
    setFrequency("");
    setQuantity("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `//localhost:5000/api/prescription/add/${patientId}`, // Use provided patient ID
        {
          medications,
          symptoms,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setShowModal(false);
      setOpenToast(true); // toast state to open after successful submission
      onSubmit(); // Call onSubmit function passed as prop
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <Modal
      open={true}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="prescription-form-container"
        style={{ backgroundColor: "#C4E4FF", borderRadius: "10px" }}
      >
        <h2 style={{ color: "#008DDA" }}>Prescription Form</h2>
        <div>
          <TextField
            id="symptoms"
            label="Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            multiline
            maxRows={4}
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="medicineName"
            label="Medicine Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            multiline
            maxRows={4}
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="frequency"
            label="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            multiline
            maxRows={4}
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="quantity"
            label="Quantity"
            type="number" // Change input type to number
            value={quantity}
            multiline
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
          />
        </div>

        <button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "16px" }}
          onClick={handleAddMedicine}
        >
          Add Medicine
        </button>
        <div>
          <h3>Medications</h3>
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Frequency</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine.medicineName}</td>
                  <td>{medicine.frequency}</td>
                  <td>{medicine.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={handleCloseToast}
        >
          <Alert onClose={handleCloseToast} severity="success">
            Submitted Successfully!
          </Alert>
        </Snackbar>
      </div>
    </Modal>
  );
};

export default PrescriptionForm;
