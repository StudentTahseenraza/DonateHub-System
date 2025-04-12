// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import axios from 'axios';

// const socket = io('http://localhost:5000'); // Connect to the backend

// const Request = () => {
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     // Fetch initial requests
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/requests');
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();

//     // Listen for new requests in real-time
//     socket.on('newRequest', (newRequest) => {
//       setRequests((prevRequests) => [...prevRequests, newRequest]);
//     });

//     return () => {
//       socket.off('newRequest'); // Clean up the listener
//     };
//   }, []);

//   const handleSubPageClick = (path) => {
//     navigate(path);
//   };

//   // Array of request categories with Spotify-inspired background colors
//   const requestCategories = [
//     { name: "Food Request", path: "/request/food", bgColor: "#1DB954" }, // Spotify Green
//     { name: "Animal Feed Request", path: "/request/animal-feed", bgColor: "#E74C3C" }, // Red
//     { name: "Furniture Request", path: "/request/furniture", bgColor: "#9B59B6" }, // Purple
//     { name: "Clothes Request", path: "/request/clothes", bgColor: "#FF5733" }, // Orange
//     { name: "Books Request", path: "/request/books", bgColor: "#00C4CC" }, // Cyan
//     { name: "Gadget Request", path: "/request/gadgets", bgColor: "#3498DB" }, // Blue
//     { name: "Electronic Request", path: "/request/electronics", bgColor: "#F1C40F" }, // Yellow
//   ];

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-5 text-white fw-bold">Request Items</h2>
//       <div className="row justify-content-center g-4">
//         {requestCategories.map((category, index) => (
//           <div className="col-md-4 col-sm-6" key={index}>
//             <div
//               className="card h-100 shadow-lg border-0 rounded-3 text-center"
//               style={{ backgroundColor: category.bgColor, color: "#FFFFFF" }}
//             >
//               <div className="card-body d-flex flex-column p-4">
//                 <h5 className="card-title fw-bold mb-3" style={{ color: "#FFFFFF" }}>
//                   {category.name}
//                 </h5>
//                 <p className="card-text flex-grow-1" style={{ color: "#E0E0E0" }}>
//                   Request {category.name.split(" ")[0].toLowerCase()} items you need today!
//                 </p>
//                 <button
//                   className="btn mt-3 px-4 py-2 rounded-pill fw-bold shadow-sm"
//                   style={{ backgroundColor: "#191414", color: "#FFFFFF" }} // Spotify Black Button
//                   onClick={() => handleSubPageClick(category.path)}
//                 >
//                   Request Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Display real-time requests */}
//       <div className="mt-5">
//         <h3 className="text-white fw-semibold mb-3">Submitted Requests</h3>
//         <div className="row g-3">
//           {requests.length > 0 ? (
//             requests.map((request) => (
//               <div className="col-md-6" key={request._id}>
//                 <div
//                   className="card shadow-sm border-0 rounded-3 p-3"
//                   style={{ backgroundColor: "#2C2F33", color: "#FFFFFF" }} // Dark Gray like Spotify
//                 >
//                   <h6 className="fw-bold" style={{ color: "#1DB954" }}>
//                     {request.category}
//                   </h6>
//                   <p className="mb-0" style={{ color: "#E0E0E0" }}>
//                     <strong>{request.itemName}</strong> - {request.description}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-muted">No requests submitted yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Request;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Connect to the backend

const Request = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch initial requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();

    // Listen for new requests in real-time
    socket.on('newRequest', (newRequest) => {
      setRequests((prevRequests) => [...prevRequests, newRequest]);
    });

    return () => {
      socket.off('newRequest'); // Clean up the listener
    };
  }, []);

  const handleSubPageClick = (path) => {
    navigate(path);
  };

  // Array of request categories with Spotify-inspired background colors
  const requestCategories = [
    { name: "Food", path: "/request/food", bgColor: "#1DB954" }, // Spotify Green
    { name: "Clothes", path: "/request/clothes", bgColor: "#FF5733" }, // Orange
    { name: "Books", path: "/request/books", bgColor: "#00C4CC" }, // Cyan
    { name: "Furniture", path: "/request/furniture", bgColor: "#9B59B6" }, // Purple
    { name: "Animal Feed", path: "/request/animal-feed", bgColor: "#E74C3C" }, // Red
    { name: "Gadgets", path: "/request/gadgets", bgColor: "#3498DB" }, // Blue
    { name: "Electronics", path: "/request/electronics", bgColor: "#F1C40F" }, // Yellow
  ];

  // Function to get the background color based on the category
  const getCategoryColor = (category) => {
    const categoryData = requestCategories.find((cat) => cat.name.toLowerCase() === category.toLowerCase());
    return categoryData ? categoryData.bgColor : "#FFFFFF"; // Default to white if category not found
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 text-white fw-bold">Request Items</h2>
      <div className="row justify-content-center g-4">
        {requestCategories.map((category, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <div
              className="card h-100 shadow-lg border-0 rounded-3 text-center"
              style={{ backgroundColor: category.bgColor, color: "#FFFFFF" }}
            >
              <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold mb-3" style={{ color: "#FFFFFF" }}>
                  {category.name}
                </h5>
                <p className="card-text flex-grow-1" style={{ color: "#E0E0E0" }}>
                  Browse donated {category.name.toLowerCase()} items.
                </p>
                <button
                  className="btn mt-3 px-4 py-2 rounded-pill fw-bold shadow-sm"
                  style={{ backgroundColor: "#191414", color: "#FFFFFF" }} // Spotify Black Button
                  onClick={() => handleSubPageClick(category.path)}
                >
                  View {category.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Display real-time requests */}
      <div className="mt-5">
        <h3 className="text-white fw-semibold mb-3">Submitted Requests</h3>
        <div className="row g-3">
          {requests.length > 0 ? (
            requests.map((request) => {
              const categoryColor = getCategoryColor(request.category); // Get the color for the request category
              return (
                <div className="col-md-6" key={request._id}>
                  <div
                    className="card shadow-sm border-0 rounded-3 p-3"
                    style={{ backgroundColor: categoryColor, color: "#FFFFFF" }} // Apply the category color
                  >
                    <h6 className="fw-bold" style={{ color: "#FFFFFF" }}>
                      {request.category}
                    </h6>
                    <p className="mb-0" style={{ color: "#E0E0E0" }}>
                      <strong>{request.itemName}</strong> - {request.description}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted">No requests submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;