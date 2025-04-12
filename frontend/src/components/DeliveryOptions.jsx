import { useState } from "react";

const DeliveryOptions = ({ onSelect }) => {
  const [option, setOption] = useState("self");

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setOption(selectedOption);
    console.log("Selected delivery option:", selectedOption);
    onSelect(selectedOption);
  };

  return (
    <div className="text-black">
      <h4 className="fw-medium mb-3">Delivery Options</h4>
      <div className="d-flex flex-column gap-2">
        <label className="d-flex align-items-center">
          <input
            type="radio"
            value="self"
            checked={option === "self"}
            onChange={handleOptionChange}
            className="me-2"
          />
          <span>Self Pickup</span>
        </label>
        <label className="d-flex align-items-center">
          <input
            type="radio"
            value="NGO"
            checked={option === "NGO"}
            onChange={handleOptionChange}
            className="me-2"
          />
          <span>NGO Pickup</span>
        </label>
        <label className="d-flex align-items-center">
          <input
            type="radio"
            value="delivery"
            checked={option === "delivery"}
            onChange={handleOptionChange}
            className="me-2"
          />
          <span>Delivery Partner</span>
        </label>
      </div>
    </div>
  );
};

export default DeliveryOptions;