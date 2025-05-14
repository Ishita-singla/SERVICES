import React from "react";
import pic1 from "../images/right.webp"; // ✅ Correct Path
import pic2 from "../images/first.webp";
import pic3 from "../images/second.webp";
import pic4 from "../images/third.webp";
import pic5 from "../images/fourth.webp";
import pic6 from "../images/fifth.webp";
import pic7 from "../images/sixth.webp";
import pic8 from "../images/one.webp";
import pic9 from "../images/two.jpg";
import pic10 from "../images/three.jpg";
import pic11 from "../images/four.jpeg";
import pic12 from "../images/five.jpg";
import { Link } from "react-router-dom";
import ContactUs from "./ContactUs";
import Services from "./Modal1";
import Slider from "./Slider";
import WhyChooseUs from "./WhyChooseUs";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Left Column - Services Box */}
        <div className="col-lg-6 d-flex flex-column align-items-center" >
          <h2 className="me-5 mb-5 text-center">Home Services at Your Doorstep</h2>

          <div 
            className="p-4 rounded shadow py-5 me-5"
            style={{
              background: "#ffffff",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h5 className="mb-3">What are you looking for?</h5>
            <div className="row">
            
            
              <Services/>
              </div>
            
            
          </div>
        </div>
        

        {/* Right Column - Image */}
        <div className="col-lg-6">
          <img
            src={pic1}
            alt="Home Services"
            className="img-fluid rounded"
            style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Rating & Customer Section */}
      <div className="d-flex justify-content-start gap-5 mt-5 ms-5">
        <div className="text-center">
          <h3>⭐ 4.8</h3>
          <p className="mb-0 text-muted">Service Rating</p>
        </div>
        <div className="text-center">
          <h3>👥 12M+</h3>
          <p className="mb-0 text-muted">Customers Globally</p>
        </div>
      </div>

      
      
<Slider/>
<WhyChooseUs/>
<ContactUs/>
<Testimonial/>
 
    </div>
  );
};

export default Home;


