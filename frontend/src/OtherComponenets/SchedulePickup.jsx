import { useState } from "react";
import "../styles/SchedulePickup.module.css";

const SchedulePickup = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pickup scheduled for ${date} at ${time}`);
    setDate("");
    setTime("");
  };

  return (
    <div className="schedule-pickup-container">
      <h2>Schedule Pickup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};

export default SchedulePickup;