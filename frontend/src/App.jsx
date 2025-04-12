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
import OtpVerification from "./AuthPages/OtpVerification";
import ForgetPassword from "./AuthPages/ForgetPassword";
import ResetPassword from "./AuthPages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
// import NGORegistration from "./pages/NGORegistration";
// import NGOSearch from "./pages/NGOSearch";
// import TopRatedNGOs from "./pages/TopRatedNGOs";
// import NGODetails from "./pages/NGODetails";

// Admin Components
import AdminLogin from "./admin/Auth/AdminLogin";
import AdminDashboard from "./admin/Pages/Dashboard";
import AdminUsers from "./admin/Pages/Users";
import AdminNGOs from "./admin/Pages/NGOs";
import AdminDonations from "./admin/Pages/Donations";
import AdminRequests from "./admin/Pages/Requests";
import AdminRoles from "./admin/Pages/Roles";
import AdminAuditLog from "./admin/Pages/AuditLog";
// import AdminProtectedRoute from "./admin/Components/AdminProtectedRoute";

import NGORegistration from './pages/NGORegistration';
import NGODashboard from './pages/NGODashboard';
// import NGOProfile from './pages/NGOProfile';
// import NGODonations from './pages/NGODonations';
// import NGORequests from './pages/NGORequests';

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
        <Route path="/auth" element={<Auth />} />
        <Route path="/otp-verification/:email" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* NGO Routes */}
        {/* <Route path="/ngo/register" element={<NGORegistration />} />
        <Route path="/ngo/search" element={<NGOSearch />} />
        <Route path="/ngo/top-rated" element={<TopRatedNGOs />} />
        <Route path="/ngo/:id" element={<NGODetails />} /> */}

<Route path="/ngo/register" element={<NGORegistration />} />
<Route path="/ngo/login" element={<Auth isNGO={true} />} />
{/* <Route element={<ProtectedRoute isNGO={true} />}> */}
  <Route path="/ngo/dashboard" element={<NGODashboard />} />
  {/* <Route path="/ngo/profile" element={<NGOProfile />} /> */}
  {/* <Route path="/ngo/donations" element={<NGODonations />} />
  <Route path="/ngo/requests" element={<NGORequests />} /> */}
{/* </Route> */}

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
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
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route element={<AdminProtectedRoute />}> */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/ngos" element={<AdminNGOs />} />
          <Route path="/admin/donations" element={<AdminDonations />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/roles" element={<AdminRoles />} />
          <Route path="/admin/audit-log" element={<AdminAuditLog />} />
        {/* </Route> */}

        {/* 404 Page - Keep this last */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;