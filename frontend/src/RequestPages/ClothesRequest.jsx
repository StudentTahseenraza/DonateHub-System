import RequestForm from "../components/RequestForm";
import foodBg from "../assets/FoodDonation.jpg"; // Import the background image

const FoodRequest = () => {
  return (
    <div
      className="main-content"
      style={{
        backgroundImage: `url(${foodBg})`, // Use the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "80px 20px 20px", // Added 80px padding at the top
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Glass-like transparent effect
          backdropFilter: "blur(10px)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "800px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "black", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Clothes Request</h2>
        <RequestForm category="clothes" />
      </div>
    </div>
  );
};

export default FoodRequest;