import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PrescriptionForm from "./PrescriptionForm"; // Import PrescriptionForm component
import SvgIcon from "@mui/material/SvgIcon";

const ViewMedicalRecordPage = () => {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    mobileNumber: "",
  });
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    // Function to fetch prescription by patientId
    const fetchPrescription = async () => {
      try {
        const patientId = "6616cd3e9ba7e0de5b0f95c1";
        const response = await fetch(
          `http://localhost:5000/api/prescription/${patientId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const prescriptions = data.data.map((record) => ({
            ...record,
            date: formatDate(record.createdAt), // Format date here
          }));
          console.log("Prescription data:", prescriptions);
          setMedicalRecords(prescriptions);
          // Fetch patient details after setting medical records
          fetchPatientDetails(patientId);
        } else {
          console.error("Failed to fetch prescriptions:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      }
    };

    const fetchPatientDetails = async (patientId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/patients/${patientId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const { name, contactNumber } = data.data;
          setPatientDetails({ name, mobileNumber: contactNumber });
        } else {
          console.error(
            "Failed to fetch patient details:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    fetchPrescription(); // Call fetchPrescription here
  }, []);

  // Handle delete record
  const handleDeleteRecord = async (recordId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/prescription/delete/${recordId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        const updatedRecords = medicalRecords.filter(
          (record) => record._id !== recordId
        );
        setMedicalRecords(updatedRecords);
        console.log("Record deleted successfully");
      } else {
        console.error("Failed to delete record:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  // Function to format date as DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        paddingLeft: "10%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "2rem", color: "#074173" }}>
          {patientDetails.name}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "2rem", color: "#074173" }}>
          {patientDetails.mobileNumber}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "16px" }}
        onClick={() => setShowModal(true)}
      >
        Add New Record
      </Button>
      {medicalRecords.map((record) => (
        <Box
          key={record._id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "16px",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Card
            sx={{
              flexBasis: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              position: "relative",
              backgroundColor: "#F5F5F5",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#008DDA",
                  fontSize: "2rem",
                  alignItems: "center",
                }}
              >
                Symptoms
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
                {record.symptoms}
              </Typography>
            </CardContent>
            <Typography
              variant="h6"
              sx={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              Date: {record.date}
            </Typography>
            <SvgIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{
                position: "absolute",
                bottom: "10px",
                left: "8px",
                width: "3rem",
                height: "3rem",
              }}
            >
              <path
                fill="currentColor"
                d="M4 4v10h2v-4h2l5.41 5.41L9.83 19l1.41 1.41l3.59-3.58l3.58 3.58L19.82 19l-3.58-3.59l3.58-3.58l-1.41-1.42L14.83 14l-4-4H11a3 3 0 0 0 3-3a3 3 0 0 0-3-3zm2 2h5a1 1 0 0 1 1 1a1 1 0 0 1-1 1H6z"
              ></path>
            </SvgIcon>
          </Card>
          <Card
            sx={{
              flexBasis: "45%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#008DDA", fontSize: "2rem" }}
                >
                  Medications
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Medicine Name</b>
                        </TableCell>
                        <TableCell>
                          <b>Frequency</b>
                        </TableCell>
                        <TableCell>
                          <b>Quantity</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {record.medications.map((medicine, index) => (
                        <TableRow key={index}>
                          <TableCell>{medicine.medicineName}</TableCell>
                          <TableCell>{medicine.frequency}</TableCell>
                          <TableCell>{medicine.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <IconButton onClick={() => handleDeleteRecord(record._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
      {showModal && (
        <PrescriptionForm
          setShowModal={setShowModal}
          onSubmit={() => setShowModal(false)}
        />
      )}
      {/* Render PrescriptionForm modal */}
    </Box>
  );
};

export default ViewMedicalRecordPage;
