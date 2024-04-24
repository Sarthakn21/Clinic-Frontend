import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";

// Import components and pages
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import PatientInfoPage from "./pages/patient-info-page";
import AppointmentPage from "./pages/appointment-page";
import PrescriptionPage from "./pages/prescription-page";
import DashboardPage from "./pages/dashboard-page";
import SideDash from "./components/SideDash/SideDash";
import PatientPage from "./pages/patient-page";
import Print from "./pages/Print";
import axios from "axios";

function App() {
  const { currentUser } = useContext(GlobalContext);
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const getUserFromApi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/getCurrent",
        {
          withCredentials: true,
        }
      );
      setRole(response.data.data.role);
      console.log("role is", role);
    } catch (error) {
      console.error("Error retrieving user from local storage:", error);
      return null;
    }
  };
  useEffect(() => {
    getUserFromApi();
  }, []);

  return (
    <>
      {currentUser && <SideDash />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/patientinfo/:id" element={<PatientInfoPage />} />
        <Route path="/prescription" element={<PrescriptionPage />} />
        <Route path="/Print/:id" element={<Print />} />
      </Routes>
    </>
  );
}

export default App;
