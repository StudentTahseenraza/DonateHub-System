// import React from 'react';
import img4 from '../assets/img4.jpg'; // Add images in the assets folder
const About = () => {
  return (
    <div className="main-content">
      <h1 className="text-center mb-4">About US</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={img4}
            alt="About Us"
            className="img-fluid rounded"
            style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <p className="lead">
            The <strong>Wastage Treasure</strong> is a web-based platform designed to
            reduce waste and help those in need by connecting donors with receivers. Our goal is to
            create a sustainable ecosystem where excess resources are shared efficiently.
          </p>
          <p>
            With features like <strong>donation tracking</strong>, <strong>live location
            sharing</strong>, and a <strong>leaderboard for top donors</strong>, we aim to make the
            process of donating and receiving items seamless and rewarding.
          </p>
          <p>
            Whether you're a restaurant with extra food, a household with unused clothes, or a
            student in need of books, our platform is here to help you make a difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;