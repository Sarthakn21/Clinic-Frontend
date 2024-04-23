import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
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

function App() {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  return (
    <>
      {currentUser && <SideDash />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/patientinfo/:id" element={<PatientInfoPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/prescription" element={<PrescriptionPage />} />
        <Route path="/Print/:id" element={<Print/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
