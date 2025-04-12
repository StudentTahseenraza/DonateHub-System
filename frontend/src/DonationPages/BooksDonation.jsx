import DonateForm from "../components/DonateForm";
import booksBg from "../assets/BooksDonation.jpg"; // Corrected import name

const BooksDonation = () => {
  return (
    <div
      className="main-content"
      style={{
        backgroundImage: `url(${booksBg})`,
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
      <div style={{ maxWidth: "500px", width: "100%" }}>
        <h2
          className="text-center mb-4"
          style={{ color: "#fff", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Books Donation
        </h2>
        <DonateForm category="books" /> {/* Note: Changed "book" to "books" for consistency */}
      </div>
    </div>
  );
};

export default BooksDonation;