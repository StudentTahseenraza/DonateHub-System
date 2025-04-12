// import React from 'react';
import img1 from '../assets/img1.jpg'; // Add images in the assets folder
import img2 from '../assets/img2.jpg'; // Add images in the assets folder

const Mission = () => {
  return (
    <div className="main-content">
      <h1 className="text-center mb-4">Our Mission</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={img1}
            alt="Mission 1"
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
          />
          <h3>How You Can Help</h3>
          <p>
            By using the <strong>Wastage Management System</strong>, you can donate items you no
            longer need, such as food, clothes, books, or furniture. Your contributions will go
            directly to those in need, reducing waste and making a positive impact on the community.
          </p>
          <p>
            Join our <strong>leaderboard</strong> to see how your donations are making a difference
            and inspire others to contribute.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={img2}
            alt="Mission 2"
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
          />
          <h3>How Others Gain Help</h3>
          <p>
            If you're in need of essential items like food, clothing, or books, you can request them
            through our platform. Our system connects you with donors who are willing to share their
            resources.
          </p>
          <p>
            With features like <strong>live location tracking</strong> and <strong>pickup/delivery
            options</strong>, receiving help has never been easier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;