import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = email.split("@")[0];
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          email,
          password,
          username,
        }
      );

      if(response.data.data.statusCode === 400) {
        navigate("/login");
      }
      sessionStorage.setItem("userEmail", email); // Store emaail
      sessionStorage.setItem("token", response.data.data.accessToken); // Store JWT
      navigate("/dashboard");
    } catch (error) {      
      alert("Registration failed!");
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
