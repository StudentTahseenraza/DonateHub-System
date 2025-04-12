import { useState } from "react";
import "../styles/DeliveryOptions.module.css";

const DeliveryOptions = ({ onSelect }) => {
  const [option, setOption] = useState("self"); // self, NGO, delivery

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setOption(selectedOption);
    onSelect(selectedOption); // Pass the selected option back to the parent
  };

  return (
    <div>
      <h4>Delivery Options</h4>
      <div>
        <label>
          <input
            type="radio"
            value="self"
            checked={option === "self"}
            onChange={handleOptionChange}
          />
          Self Pickup
        </label>
        <label>
          <input
            type="radio"
            value="NGO"
            checked={option === "NGO"}
            onChange={handleOptionChange}
          />
          NGO Pickup
        </label>
        <label>
          <input
            type="radio"
            value="delivery"
            checked={option === "delivery"}
            onChange={handleOptionChange}
          />
          Delivery Partner
        </label>
      </div>
    </div>
  );
};

export default DeliveryOptions;