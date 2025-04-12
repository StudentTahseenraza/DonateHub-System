import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Quick Links Section */}
          <div className="col-md-3 col-6 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/services" className="text-white text-decoration-none">Services</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white text-decoration-none">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="col-md-3 col-6 mb-4">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-white text-decoration-none">Help Center</a></li>
              <li><a href="/returns" className="text-white text-decoration-none">Returns & Refunds</a></li>
              <li><a href="/shipping" className="text-white text-decoration-none">Shipping Info</a></li>
              <li><a href="/track-order" className="text-white text-decoration-none">Track Your Order</a></li>
              <li><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-3 col-6 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-white">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://instagram.com" className="text-white">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://linkedin.com" className="text-white">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://youtube.com" className="text-white">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="col-md-3 col-6 mb-4">
            <h5>Newsletter</h5>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center py-3 border-top">
          <p className="mb-0">&copy; 2023 ShareCare System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;