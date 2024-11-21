import React from "react";
import "./Calender.css";

const Calendar = ({ events }) => {
  // Define hours for time slots
  const hours = [...Array(24).keys()]; // 0 to 23

  // Helper to get events for a specific day and hour
  const getEventsForSlot = (day, hour) => {
    return events.filter((event) => {
      const eventDate = new Date(event.datetime);
      return (
        eventDate.getDay() === day && eventDate.getHours() === hour
      );
    });
  };

  return (
    <div className="calendar-grid">
      <div className="calendar-header">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
          (day, idx) => (
            <div key={idx} className="calendar-day-header">
              {day}
            </div>
          )
        )}
      </div>
      <div className="calendar-body">
        {hours.map((hour) => (
          <div key={hour} className="calendar-row">
            {Array.from({ length: 7 }).map((_, day) => (
              <div key={day} className="calendar-cell">
                <div className="time-slot">{hour}:00</div>
                <div className="events-list">
                  {getEventsForSlot(day, hour).map((event) => (
                    <div key={event.id} className="event-item">
                      <strong>{event.name}</strong>
                      <p>{new Date(event.datetime).toLocaleTimeString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;