import React, { useState } from "react";
import "./EventForm.css";
import axios from "axios";

const EventForm = ({ onClose, onEventCreated }) => {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [tag, setTag] = useState("General"); // Default tag value

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
            
      // Make POST request to create a new event
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, {
        name, datetime, tag
      },
        {withCredentials: true,
        headers: {Authorization: `Bearer ${token}`}
        }
      );

      if (response.status === 200) { // Correct status check
        console.log("Event successfully created!");
        await onEventCreated(); // Fetch updated events
        onClose(); // Close the modal
      } else {
        console.error("Failed to create event:", response.status);
        alert("Failed to create the event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
          {/* Tag selection */}
          <label htmlFor="tag">Event Category:</label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Birthday">Birthday</option>
            <option value="Holiday">Holiday</option>
          </select>
          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              Create
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
