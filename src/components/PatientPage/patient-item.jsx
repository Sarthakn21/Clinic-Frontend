import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AddPatientModal from "./add-patient-modal";
import axios from "axios";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

const PatientItem = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useContext(GlobalContext);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRecord = (record) => {
    console.log("Adding record:", record);
    handleCloseModal();
  };

  useEffect(() => {
    async function getPatients() {
      try {
        const response = await axios.get("http://localhost:5000/api/patients", {
          withCredentials: true,
        });

        console.log("this is response", response);
        setPatients(response.data.data);
      } catch (error) {
        if (error.response.status == 401) {
          enqueueSnackbar("Unauthorized request", { variant: "error" });
        }
        enqueueSnackbar("Some error occured", { variant: "error" });
      }
    }
    getPatients();
  }, []);

  const handleSearch = async (searchText) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/patients/search/${searchText}`,
        {
          withCredentials: true,
        }
      );
      setPatients(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchText);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/delete/${id}`, {
        withCredentials: true,
      });
      setPatients(patients.filter((patient) => patient._id !== id));
      enqueueSnackbar("Patient deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Unable to delete patient", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-4xl font-semibold">
        All Patients
        <div className="p-10">
          <Input
            placeholder="Search Patients by Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={handleOpenModal}>Add New Patient</Button>
          <AddPatientModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddRecord}
          />
        </div>
      </div>
      <Table>
        <TableCaption>Patient Information</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead style={{ width: "80px" }}>Delete</TableHead>{" "}
          </TableRow>
        </TableHeader>
        {patients ? (
          <TableBody>
            {patients &&
              patients.map((patient, index) => (
                <TableRow key={patient._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.Dob}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contactNumber}</TableCell>
                  <TableCell>{patient.weight}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <Link to={`/patientinfo/${patient._id}`}>View</Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(patient._id)}
                      style={{ backgroundColor: "white" }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        ) : (
          <h3>Loading</h3>
        )}
      </Table>
    </div>
  );
};

export default PatientItem;
