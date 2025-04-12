// // import React from 'react';
// import DonateForm from '../components/DonateForm';

// const Donate = () => {
//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Donate Items</h2>
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <DonateForm />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Donate;


// import { Outlet, Link } from "react-router-dom";

// const Donate = () => {
//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Donate Items</h2>
//       <div className="row justify-content-center">
//         <div className="col-md-10">
//           {/* Navigation Links for Sub-Pages */}
//           <div className="d-flex justify-content-between mb-4">
//             <Link to="food" className="btn btn-outline-primary">Food Donation</Link>
//             <Link to="clothes" className="btn btn-outline-primary">Clothes Donation</Link>
//             <Link to="books" className="btn btn-outline-primary">Books Donation</Link>
//             <Link to="furniture" className="btn btn-outline-primary">Furniture Donation</Link>
//             <Link to="animal-feed" className="btn btn-outline-primary">Animal Feed Donation</Link>
//             <Link to="gadgets" className="btn btn-outline-primary">Gadget Donation</Link>
//             <Link to="electronics" className="btn btn-outline-primary">Electronic Donation</Link>
//           </div>

//           {/* Render Sub-Pages Here */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Donate;


// import { useNavigate } from "react-router-dom";

// const Donate = () => {
//   const navigate = useNavigate();

//   const handleSubPageClick = (path) => {
//     navigate(path); // Navigate to the sub-page
//   };

//   // Array of donation categories with Spotify-inspired background colors
//   const donationCategories = [
//     { name: "Food Donation", path: "/donate/food", bgColor: "#1DB954" }, // Spotify Green
//     { name: "Clothes Donation", path: "/donate/clothes", bgColor: "#FF5733" }, // Vibrant Orange
//     { name: "Books Donation", path: "/donate/books", bgColor: "#00C4CC" }, // Cyan
//     { name: "Furniture Donation", path: "/donate/furniture", bgColor: "#9B59B6" }, // Purple
//     { name: "Animal Feed Donation", path: "/donate/animal-feed", bgColor: "#E74C3C" }, // Red
//     { name: "Gadget Donation", path: "/donate/gadgets", bgColor: "#3498DB" }, // Blue
//     { name: "Electronic Donation", path: "/donate/electronics", bgColor: "#F1C40F" }, // Yellow
//   ];

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-5 text-white fw-bold">Donate Items</h2>
//       <div className="row justify-content-center g-4">
//         {donationCategories.map((category, index) => (
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
//                   Help others by donating your {category.name.split(" ")[0].toLowerCase()} items today!
//                 </p>
//                 <button
//                   className="btn mt-3 px-4 py-2 rounded-pill fw-bold shadow-sm"
//                   style={{ backgroundColor: "#191414", color: "#FFFFFF" }} // Spotify Black Button
//                   onClick={() => handleSubPageClick(category.path)}
//                 >
//                   Donate Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Donate;



import { useNavigate } from "react-router-dom";

const Donate = () => {
  const navigate = useNavigate();

  const handleSubPageClick = (path) => {
    navigate(path); // Navigate to the sub-page
  };

  // Array of donation categories with Spotify-inspired background colors
  const donationCategories = [
    { name: "Food Donation", path: "/donate/food", bgColor: "#1DB954" }, // Spotify Green
    { name: "Clothes Donation", path: "/donate/clothes", bgColor: "#FF5733" }, // Vibrant Orange
    { name: "Books Donation", path: "/donate/books", bgColor: "#00C4CC" }, // Cyan
    { name: "Furniture Donation", path: "/donate/furniture", bgColor: "#9B59B6" }, // Purple
    { name: "Animal Feed Donation", path: "/donate/animal-feed", bgColor: "#E74C3C" }, // Red
    { name: "Gadget Donation", path: "/donate/gadgets", bgColor: "#3498DB" }, // Blue
    { name: "Electronic Donation", path: "/donate/electronics", bgColor: "#F1C40F" }, // Yellow
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 text-white fw-bold">Donate Items</h2>
      <div className="row justify-content-center g-4">
        {donationCategories.map((category, index) => (
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
                  Help others by donating your {category.name.split(" ")[0].toLowerCase()} items today!
                </p>
                <button
                  className="btn mt-3 px-4 py-2 rounded-pill fw-bold shadow-sm"
                  style={{ backgroundColor: "#191414", color: "#FFFFFF" }} // Spotify Black Button
                  onClick={() => handleSubPageClick(category.path)}
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donate;