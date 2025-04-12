// import { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io('http://localhost:5000');

// const Leaderboard = () => {
//   const [topDonors, setTopDonors] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [totalWasteReduced, setTotalWasteReduced] = useState(0);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/leaderboard");
//         setTopDonors(response.data);
//         const wasteReduced = response.data.reduce((sum, donor) => sum + (donor.totalPoints || 0), 0) / 10;
//         setTotalWasteReduced(wasteReduced);
//       } catch (err) {
//         console.error("Error fetching leaderboard:", err);
//       }
//     };
//     fetchLeaderboard();

//     // Real-time updates
//     socket.on('leaderboardUpdate', (updatedData) => {
//       setTopDonors(updatedData);
//       const wasteReduced = updatedData.reduce((sum, donor) => sum + (donor.totalPoints || 0), 0) / 10;
//       setTotalWasteReduced(wasteReduced);
//       console.log("Leaderboard updated:", updatedData);
//     });

//     socket.on('newDonor', (newDonor) => {
//       setNotifications((prev) => [
//         ...prev,
//         { id: Date.now(), message: `New donor joined: ${newDonor.name}` },
//       ]);
//       // Fetch updated leaderboard to include new donor
//       fetchLeaderboard();
//     });

//     socket.on('newRequest', (newRequest) => {
//       setNotifications((prev) => [
//         ...prev,
//         { id: Date.now(), message: `New request: ${newRequest.category} - ${newRequest.itemName}` },
//       ]);
//     });

//     socket.on('newDonation', (donation) => {
//       setNotifications((prev) => [
//         ...prev,
//         { id: Date.now(), message: `New donation: ${donation.itemName} (${donation.category})` },
//       ]);
//     });

//     return () => {
//       socket.off('leaderboardUpdate');
//       socket.off('newDonor');
//       socket.off('newRequest');
//       socket.off('newDonation');
//     };
//   }, []);

//   const shareOnSocialMedia = (rank, name, points, badge) => {
//     const message = `I ranked #${rank} on the Waste Management Leaderboard with ${points} points and a ${badge} badge! Reducing waste one donation at a time! 🌍`;
//     const url = encodeURIComponent(window.location.href);
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`;
//     const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(message)}`;
//     window.open(twitterUrl, "_blank");
//     window.open(facebookUrl, "_blank");
//   };

//   return (
//     <div>
//       <div className="card shadow-lg border-0 rounded-3 mb-4" style={{ backgroundColor: "#2C2F33" }}>
//         <div className="card-body text-center">
//           <h4 className="text-white fw-bold">Total Waste Reduced</h4>
//           <p className="text-success display-5 fw-semibold">{totalWasteReduced.toFixed(1)} kg</p>
//           <p className="text-white">Thanks to our amazing donors!</p>
//         </div>
//       </div>

//       <div className="card shadow-lg border-0 rounded-3 mb-4" style={{ backgroundColor: "#2C2F33" }}>
//         <div className="card-body p-4">
//           <h3 className="text-center text-white fw-semibold mb-4">Leaderboard</h3>
//           <div className="table-responsive">
//             <table className="table table-dark table-striped table-hover">
//               <thead>
//                 <tr>
//                   <th>Rank</th>
//                   <th>Name</th>
//                   <th>Points</th>
//                   <th>Today</th>
//                   <th>Category</th>
//                   <th>Badge</th>
//                   <th>Share</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {topDonors.length > 0 ? (
//                   topDonors.map((donor, index) => (
//                     <tr key={donor._id || index}>
//                       <td>{index + 1}</td>
//                       <td>{donor.name || "Anonymous"}</td>
//                       <td>{donor.totalPoints || 0}</td>
//                       <td>{donor.donationsToday || 0}</td>
//                       <td>{donor.favoriteCategory || "Mixed"}</td>
//                       <td>
//                         {donor.badge === "Gold" && <span className="text-warning">🥇 Gold</span>}
//                         {donor.badge === "Silver" && <span className="text-secondary">🥈 Silver</span>}
//                         {donor.badge === "Bronze" && <span className="text-danger">🥉 Bronze</span>}
//                         {!["Gold", "Silver", "Bronze"].includes(donor.badge) && "—"}
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-sm rounded-pill fw-bold"
//                           style={{ backgroundColor: "#1DB954", color: "#FFFFFF" }}
//                           onClick={() =>
//                             shareOnSocialMedia(index + 1, donor.name, donor.totalPoints, donor.badge || "None")
//                           }
//                         >
//                           Share
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center text-white">No donors yet. Be the first!</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow-lg border-0 rounded-3" style={{ backgroundColor: "#2C2F33" }}>
//         <div className="card-body p-4">
//           <h5 className="text-white fw-semibold mb-3">Latest Updates</h5>
//           <ul className="list-group list-group-flush">
//             {notifications.length > 0 ? (
//               notifications.slice(-5).map((notification) => (
//                 <li key={notification.id} className="list-group-item bg-transparent text-white border-0 py-2">
//                   {notification.message}
//                 </li>
//               ))
//             ) : (
//               <li className="list-group-item bg-white text-muted border-0 py-2">
//                 No recent updates.
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:5000');

const Leaderboard = () => {
  const [topDonors, setTopDonors] = useState([]);
  const [weeklyDonors, setWeeklyDonors] = useState([]);
  const [monthlyDonors, setMonthlyDonors] = useState([]); // New state for monthly leaderboard
  const [notifications, setNotifications] = useState([]);
  const [totalWasteReduced, setTotalWasteReduced] = useState(0);
  const [activeUsers, setActiveUsers] = useState({ donors: 0, receivers: 0 }); // Track active users
  const [lastResetDate, setLastResetDate] = useState(""); // Track last reset date

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all leaderboard data
        const [leaderboardRes, weeklyRes, monthlyRes, statsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/leaderboard"),
          axios.get("http://localhost:5000/api/leaderboard/weekly"),
          axios.get("http://localhost:5000/api/leaderboard/monthly"),
          axios.get("http://localhost:5000/api/stats") // New endpoint for stats
        ]);

        setTopDonors(leaderboardRes.data);
        setWeeklyDonors(weeklyRes.data);
        setMonthlyDonors(monthlyRes.data);
        
        const wasteReduced = leaderboardRes.data.reduce((sum, donor) => sum + (donor.totalPoints || 0), 0) / 10;
        setTotalWasteReduced(wasteReduced);
        
        // Set active users and last reset date from stats
        setActiveUsers({
          donors: statsRes.data.activeDonors || 0,
          receivers: statsRes.data.activeReceivers || 0
        });
        setLastResetDate(statsRes.data.lastReset || "Not available");
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();

    // Real-time updates
    socket.on('leaderboardUpdate', (updatedData) => {
      setTopDonors(updatedData);
      const wasteReduced = updatedData.reduce((sum, donor) => sum + (donor.totalPoints || 0), 0) / 10;
      setTotalWasteReduced(wasteReduced);
    });

    socket.on('activeUsersUpdate', ({ donors, receivers }) => {
      setActiveUsers({ donors, receivers });
    });

    socket.on('newDonor', (newDonor) => {
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: `New donor joined: ${newDonor.name}` },
      ]);
      // Update active donors count
      setActiveUsers(prev => ({ ...prev, donors: prev.donors + 1 }));
    });

    socket.on('newRequest', (newRequest) => {
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: `New request: ${newRequest.category} - ${newRequest.itemName}` },
      ]);
    });

    socket.on('newDonation', (donation) => {
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: `New donation: ${donation.itemName} (${donation.category})` },
      ]);
    });

    socket.on('monthlyReset', (resetData) => {
      setMonthlyDonors(resetData.monthlyLeaderboard);
      setLastResetDate(resetData.resetDate);
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: "Monthly leaderboard has been reset!" },
      ]);
    });

    return () => {
      socket.off('leaderboardUpdate');
      socket.off('activeUsersUpdate');
      socket.off('newDonor');
      socket.off('newRequest');
      socket.off('newDonation');
      socket.off('monthlyReset');
    };
  }, []);

  const shareOnSocialMedia = (rank, name, points, badge) => {
    const message = `I ranked #${rank} on the Waste Management Leaderboard with ${points} points and a ${badge} badge! Reducing waste one donation at a time! 🌍`;
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(message)}`;
    window.open(twitterUrl, "_blank");
    window.open(facebookUrl, "_blank");
  };

  return (
    <div>
      <div className="card shadow-lg border-0 rounded-3 mb-4" style={{ backgroundColor: "#2C2F33" }}>
        <div className="card-body text-center">
          <h4 className="text-white fw-bold">Total Waste Reduced</h4>
          <p className="text-success display-5 fw-semibold">{totalWasteReduced.toFixed(1)} kg</p>
          <div className="d-flex justify-content-around mt-3">
            <div>
              <p className="text-white mb-1">Active Donors</p>
              <p className="text-info fs-4 fw-bold">{activeUsers.donors}</p>
            </div>
            <div>
              <p className="text-white mb-1">Active Receivers</p>
              <p className="text-info fs-4 fw-bold">{activeUsers.receivers}</p>
            </div>
            <div>
              <p className="text-white mb-1">Last Reset</p>
              <p className="text-warning fs-4 fw-bold">{lastResetDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* All-time Leaderboard */}
      <div className="card shadow-lg border-0 rounded-3 mb-4" style={{ backgroundColor: "#2C2F33" }}>
        <div className="card-body p-4">
          <h3 className="text-center text-white fw-semibold mb-4">All-Time Leaderboard</h3>
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Today</th>
                  <th>Category</th>
                  <th>Badge</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {topDonors.length > 0 ? (
                  topDonors.map((donor, index) => (
                    <tr key={donor._id || index}>
                      <td>{index + 1}</td>
                      <td>{donor.name || "Anonymous"}</td>
                      <td>{donor.totalPoints || 0}</td>
                      <td>{donor.donationsToday || 0}</td>
                      <td>{donor.favoriteCategory || "Mixed"}</td>
                      <td>
                        {donor.badge === "Gold" && <span className="text-warning">🥇 Gold</span>}
                        {donor.badge === "Silver" && <span className="text-secondary">🥈 Silver</span>}
                        {donor.badge === "Bronze" && <span className="text-danger">🥉 Bronze</span>}
                        {!["Gold", "Silver", "Bronze"].includes(donor.badge) && "—"}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm rounded-pill fw-bold"
                          style={{ backgroundColor: "#1DB954", color: "#FFFFFF" }}
                          onClick={() =>
                            shareOnSocialMedia(index + 1, donor.name, donor.totalPoints, donor.badge || "None")
                          }
                        >
                          Share
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-white">No donors yet. Be the first!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Weekly Leaderboard */}
      <div className="card shadow-lg border-0 rounded-3 mb-4" style={{ backgroundColor: "#2C2F33" }}>
        <div className="card-body p-4">
          <h3 className="text-center text-white fw-semibold mb-4">Weekly Leaderboard</h3>
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Weekly Points</th>
                  <th>Category</th>
                  <th>Badge</th>
                </tr>
              </thead>
              <tbody>
                {weeklyDonors.length > 0 ? (
                  weeklyDonors.map((donor, index) => (
                    <tr key={donor._id || index}>
                      <td>{index + 1}</td>
                      <td>{donor.name || "Anonymous"}</td>
                      <td>{donor.weeklyPoints || 0}</td>
                      <td>{donor.favoriteCategory || "Mixed"}</td>
                      <td>
                        {donor.badge === "Gold" && <span className="text-warning">🥇 Gold</span>}
                        {donor.badge === "Silver" && <span className="text-secondary">🥈 Silver</span>}
                        {donor.badge === "Bronze" && <span className="text-danger">🥉 Bronze</span>}
                        {!["Gold", "Silver", "Bronze"].includes(donor.badge) && "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-white">No weekly data yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Monthly Leaderboard */}
      <div className="card shadow-lg border-0 rounded-3 mb-4" style={{ backgroundColor: "#2C2F33" }}>
        <div className="card-body p-4">
          <h3 className="text-center text-white fw-semibold mb-4">
            Monthly Leaderboard (Reset on: {lastResetDate})
          </h3>
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Monthly Points</th>
                  <th>Category</th>
                  <th>Badge</th>
                </tr>
              </thead>
              <tbody>
                {monthlyDonors.length > 0 ? (
                  monthlyDonors.map((donor, index) => (
                    <tr key={donor._id || index}>
                      <td>{index + 1}</td>
                      <td>{donor.name || "Anonymous"}</td>
                      <td>{donor.monthlyPoints || 0}</td>
                      <td>{donor.favoriteCategory || "Mixed"}</td>
                      <td>
                        {donor.badge === "Gold" && <span className="text-warning">🥇 Gold</span>}
                        {donor.badge === "Silver" && <span className="text-secondary">🥈 Silver</span>}
                        {donor.badge === "Bronze" && <span className="text-danger">🥉 Bronze</span>}
                        {!["Gold", "Silver", "Bronze"].includes(donor.badge) && "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-white">No monthly data yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card shadow-lg border-0 rounded-3" style={{ backgroundColor: "#2C2F33" }}>
        <div className="card-body p-4">
          <h5 className="text-white fw-semibold mb-3">Latest Updates</h5>
          <ul className="list-group list-group-flush">
            {notifications.length > 0 ? (
              notifications.slice(-5).map((notification) => (
                <li key={notification.id} className="list-group-item bg-transparent text-white border-0 py-2">
                  {notification.message}
                </li>
              ))
            ) : (
              <li className="list-group-item bg-white text-muted border-0 py-2">
                No recent updates.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;