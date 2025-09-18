// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Request from "./pages/Request";
import Leaderboard from "./pages/Leaderboard";
// import AdminDashboard from "./pages/AdminDashboard";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Rewards from "./pages/Rewards";
import FoodDonation from "./DonationPages/FoodDonation";
import ClothesDonation from "./DonationPages/ClothesDonation";
import BooksDonation from "./DonationPages/BooksDonation";
import FurnitureDonation from "./DonationPages/FurnitureDonation";
import AnimalFeedDonation from "./DonationPages/AnimalFeedDonation";
import GadgetDonation from "./DonationPages/GadgetDonation";
import ElectronicDonation from "./DonationPages/ElectronicDonation";
import SubPageLayout from "./Layouts/SubPageLayout";
import FoodRequest from "./RequestPages/FoodRequest";
import ClothesRequest from "./RequestPages/ClothesRequest";
import BooksRequest from "./RequestPages/BooksRequest";
import FurnitureRequest from "./RequestPages/FurnitureRequest";
import AnimalFeedRequest from "./RequestPages/AnimalFeedRequest";
import GadgetRequest from "./RequestPages/GadgetRequest";
import ElectronicRequest from "./RequestPages/ElectronicRequest";
import Auth from "./AuthPages/Auth";
import Profile from "./pages/Profile";

import NGORegistration from "./pages/NGORegistration";
import NGODashboard from "./pages/NGODashboard";


const App = () => {
  return (
    <Router>
      <Sidebar />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rewards" element={<Rewards />} />

        <Route path="/ngo/register" element={<NGORegistration />} />
        <Route path="/ngo/login" element={<Auth isNGO={true} />} />
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        

        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/donate" element={<Donate />} />
        <Route path="/request" element={<Request />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected Subpage Routes */}
        <Route element={<SubPageLayout />}>
          <Route path="/donate/food" element={<FoodDonation />} />
          <Route path="/donate/clothes" element={<ClothesDonation />} />
          <Route path="/donate/books" element={<BooksDonation />} />
          <Route path="/donate/furniture" element={<FurnitureDonation />} />
          <Route path="/donate/animal-feed" element={<AnimalFeedDonation />} />
          <Route path="/donate/gadgets" element={<GadgetDonation />} />
          <Route path="/donate/electronics" element={<ElectronicDonation />} />

          <Route path="/request/food" element={<FoodRequest />} />
          <Route path="/request/clothes" element={<ClothesRequest />} />
          <Route path="/request/books" element={<BooksRequest />} />
          <Route path="/request/furniture" element={<FurnitureRequest />} />
          <Route path="/request/animal-feed" element={<AnimalFeedRequest />} />
          <Route path="/request/gadgets" element={<GadgetRequest />} />
          <Route path="/request/electronics" element={<ElectronicRequest />} />
        </Route>

        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
