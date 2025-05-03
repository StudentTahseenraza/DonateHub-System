// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section with Background Image */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Unused2Useful</h1>
          <h2 className="lead">Reduce waste, help others, and make a difference!</h2>
          <div className="hero-buttons">
            <Link to="/donate" className="btn btn-primary btn-lg me-3">
              Donate Items
            </Link>
            <Link to="/request" className="btn btn-success btn-lg">
              Request Items
            </Link>
          </div>
        </div>
      </div>

      {/* Rest of the content sections */}
      <div className="main-content">
        {/* Key Features Section */}
        <div className="container my-5">
          <h2 className="text-center mb-4">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="feature-card p-4">
                <i className="fas fa-recycle fa-3x mb-3"></i>
                <h4>Reduce Waste</h4>
                <p>Help reduce waste by donating unused items to those in need.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-card p-4">
                <i className="fas fa-hand-holding-heart fa-3x mb-3"></i>
                <h4>Help Others</h4>
                <p>Your donations can make a significant impact on someone's life.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-card p-4">
                <i className="fas fa-globe fa-3x mb-3"></i>
                <h4>Eco-Friendly</h4>
                <p>Contribute to a greener and more sustainable planet.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works-section py-5">
          <div className="container">
            <h2 className="text-center mb-4">How It Works</h2>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="step-card p-4">
                  <i className="fas fa-sign-in-alt fa-3x mb-3"></i>
                  <h4>Sign Up</h4>
                  <p>Create an account to start donating or requesting items.</p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="step-card p-4">
                  <i className="fas fa-box-open fa-3x mb-3"></i>
                  <h4>Donate or Request</h4>
                  <p>List items you want to donate or request items you need.</p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="step-card p-4">
                  <i className="fas fa-handshake fa-3x mb-3"></i>
                  <h4>Connect</h4>
                  <p>Get matched with donors or receivers in your area.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section py-5">
          <div className="container">
            <h2 className="text-center mb-4">What Our Users Say</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="testimonial-card p-4">
                  <p>"This platform helped me donate my unused items to people who really needed them. Highly recommended!"</p>
                  <p className="text-end fw-bold">- Akshay</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial-card p-4">
                  <p>I received books for my studies through this platform. It's a lifesaver!</p>
                  <p className="text-end fw-bold">- Neha</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial-card p-4">
                  <p>A great initiative to reduce waste and help others. Proud to be a part of it!</p>
                  <p className="text-end fw-bold">- Rahul</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;