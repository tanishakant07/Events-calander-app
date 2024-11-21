import React from "react";

const Calendar = ({ events }) => {
  return (
    <div className="calendar">
      {[...Array(7)].map((_, day) => (
        <div className="calendar-day" key={day}>
          <h3>Day {day + 1}</h3>
          {events
            .filter((event) => new Date(event.datetime).getDay() === day)
            .map((event) => (
              <div key={event.id} className="event">
                <h4>{event.name}</h4>
                <p>{new Date(event.datetime).toLocaleTimeString()}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
