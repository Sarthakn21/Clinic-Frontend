import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

  const getUserFromLocalStorage = () => {
    try {
      const userData = localStorage.getItem("currentUser");
      const user = JSON.parse(userData);
      return user;
    } catch (error) {
      console.error("Error retrieving user from local storage:", error);
      return null;
    }
  };

  useEffect(() => {
    const userFromStorage = getUserFromLocalStorage();
    if (userFromStorage && userFromStorage.role) {
      setAuth(true);
      setRole(userFromStorage.role);
    } else {
      setAuth(false);
      setRole("");
    }
  }, []);

  return (
    <>
      {currentUser && <SideDash auth={auth} setAuth={setAuth} role={role} />}
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
