import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "../components/EventForm.css"; // Ensure consistent styling

const EventForm = ({ open, handleClose, onEventCreated }) => {
  const [formData, setFormData] = useState({ name: "", datetime: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to create an event
      const response = await fetch(`${process.env.REACT_APP_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Pass token for authenticated requests
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Event created successfully!");
        await onEventCreated(); // Refresh the event list in the dashboard
        handleClose(); // Close the modal
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
    <Modal open={open} onClose={handleClose}>
      <div className="modal-container">
        <form onSubmit={handleSubmit} className="event-form">
          <h3>Create Event</h3>
          <input
            type="text"
            placeholder="Event Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={formData.datetime}
            onChange={(e) =>
              setFormData({ ...formData, datetime: e.target.value })
            }
            required
          />
          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              Save
            </button>
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EventForm;
