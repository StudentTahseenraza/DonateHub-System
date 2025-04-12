import DonateForm from "../components/DonateForm";
import foodBg from "../assets/food.jpg";

const FoodDonation = () => {
  return (
    <div
      className="main-content"
      style={{
        backgroundImage: `url(${foodBg})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        <h2
          className="text-center mb-4"
          style={{ color: "#fff", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Food Donation
        </h2>
        <DonateForm category="food" />
      </div>
    </div>
  );
};

export default FoodDonation;