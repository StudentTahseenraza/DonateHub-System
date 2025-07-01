
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