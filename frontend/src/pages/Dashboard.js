import React, { useState } from "react";
import Calendar from "../components/CalenderForm.js";
import EventForm from "../components/EventForm.js";
import Navbar from "../components/Navbar.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
      }
      // Make POST request to create a new event
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/events`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status !== 200) {
        throw new Error("Failed to fetch events");
      }

      setEvents(response.data.data.events);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        {/* Create Event Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-create-event"
        >
          Create Event
        </button>

        {/* Updated Calendar Component */}
        <Calendar events={events} />

        {/* Modal for Event Form */}
        {isModalOpen && (
          <EventForm
            onClose={() => setIsModalOpen(false)}
            onEventCreated={fetchEvents} // Refresh events after creation
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
