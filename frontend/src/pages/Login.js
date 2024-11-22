import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EmailContext } from "../App"; // Import context

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { email, setEmail } = useContext(EmailContext); // Get and set email from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const username = email.split("@")[0];
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {email, password, username }
      );
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("token", response.data.data.accessToken); // Store JWT
      navigate("/dashboard");
    } catch (error) {
      alert(`Login failed ${error?.response?.data?.message || ""}`);
    }
  };

  return (
    <div className="login-container">
      <h1>Events Calendar</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email in context
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
