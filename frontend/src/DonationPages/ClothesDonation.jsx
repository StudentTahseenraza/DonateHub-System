import DonateForm from "../components/DonateForm";
import clothesBg from "../assets/ClotheDonation.jpg"; // Import the image

const ClothesDonation = () => {
  return (
    <div
      className="main-content"
      style={{
        backgroundImage: `url(${clothesBg})`, // Use the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#fff", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Clothes Donation</h2>
        <DonateForm category="clothes" />
      </div>
    </div>
  );
};

export default ClothesDonation;