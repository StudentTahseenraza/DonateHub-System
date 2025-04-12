import { useState } from "react";
import "../styles/Feedback.module.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;