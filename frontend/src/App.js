import React, { createContext, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login.js";
import RegistrationPage from "./pages/Registration.js";
import Dashboard from "./pages/Dashboard.js";
import axios from "axios";
import "./App.css";

// Create context
export const EmailContext = createContext();

const DynamicRoute = () => {
  const [userExists, setUserExists] = useState(null);
  const { email } = React.useContext(EmailContext); // Get email from context

  const checkUserExists = useCallback(async () => {
    if (!email) {
      setUserExists(false); // If no email, assume registration first
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/exists?email=${email}`
      );
      setUserExists(response.data.exists);
    } catch (error) {
      console.error("Error checking user existence:", error);
      setUserExists(false);
    }
  }, [email]); // Dependency on email

  useEffect(() => {
    checkUserExists();
  }, [checkUserExists]);

  if (userExists === null) return <div>Loading...</div>;

  // Dynamically decide which page to show
  return userExists ? <LoginPage /> : <RegistrationPage />;
};

function App() {
  const [email, setEmail] = useState(sessionStorage.getItem("userEmail") || "");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      <Router>
        <Routes>
          <Route path="/" element={<DynamicRoute />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </EmailContext.Provider>
  );
}

export default App;
