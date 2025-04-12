// // import React from "react";
// import "../styles/Rewards.module.css";
// const Rewards = () => {
//   const rewards = [
//     { id: 1, name: "Certificate of Appreciation", icon: "📜" },
//     { id: 2, name: "Social Media Shoutout", icon: "📣" },
//   ];

//   return (
//     <div className="rewards-container">
//       <h2>Rewards</h2>
//       <div className="rewards-list">
//         {rewards.map((reward) => (
//           <div key={reward.id} className="reward-item">
//             <span>{reward.icon}</span>
//             <p>{reward.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rewards;

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "bootstrap/dist/css/bootstrap.min.css";

const Rewards = () => {
  const [donorName, setDonorName] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCertificate(true);
  };

  const getBadge = (amount) => {
    if (amount >= 1000) return "Gold";
    if (amount >= 500) return "Silver";
    return "Bronze";
  };

  const badge = getBadge(donationAmount);

  return (
    <div className="main-content">
      <h2 className="text-center text-primary">Certificate of Appreciation</h2>
      <form onSubmit={handleSubmit} className="badge bg-secondary card p-4 shadow-lg" >
        <div className="mb-3">
          <label className="form-label">Donors Name:</label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Donation Amount ($):</label>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Donation Date:</label>
          <input
            type="date"
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary text-white fw-bold">Generate Certificate</button>
      </form>

      {showCertificate && (
        <div ref={certificateRef} className="border border-warning p-5 mt-5 bg-light shadow-lg text-center">
          <h2 className="text-uppercase text-dark">Certificate of Appreciation</h2>
          <p className="mt-3">This is to certify that</p>
          <h3 className="text-success fw-bold">{donorName}</h3>
          <p className="fw-bold">has generously donated ${donationAmount} on {donationDate}</p>
          <p className="mt-4 text-secondary">Your generosity helps us continue our mission.</p>
          <div className="badge bg-warning text-dark p-3 mt-3 fw-bold">{badge} Donor</div>
          <div className="mt-3">
            <img src={`/images/${badge.toLowerCase()}_badge.png`} alt={`${badge} Badge`} width="100" />
          </div>
          <button onClick={handlePrint} className="btn btn-primary text-white fw-bold mt-4">Print Certificate</button>
        </div>
      )}
    </div>
  );
};

export default Rewards;

