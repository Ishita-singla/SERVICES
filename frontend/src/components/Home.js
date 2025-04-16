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
import Services from "./Modal1";

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

      {/* Bootstrap Carousel */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-wrap="false">

        <div className="carousel-inner mt-5 py-5">
          {/* First Slide */}
          <div className="carousel-item active">
            <div className="d-flex justify-content-center gap-3">
              <div className="col-4">
                <img src={pic2} className="img-fluid rounded" alt="Slide 1" />
              </div>
              <div className="col-4">
                <img src={pic3} className="img-fluid rounded" alt="Slide 2" />
              </div>
              <div className="col-4">
                <img src={pic4} className="img-fluid rounded" alt="Slide 3" />
              </div>
            </div>
          </div>

          {/* Second Slide */}
          <div className="carousel-item">
            <div className="d-flex justify-content-center gap-3">
              <div className="col-4">
                <img src={pic5} className="img-fluid rounded" alt="Slide 4" />
              </div>
              <div className="col-4">
                <img src={pic6} className="img-fluid rounded" alt="Slide 5" />
              </div>
              <div className="col-4">
                <img src={pic7} className="img-fluid rounded" alt="Slide 6" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="carousel-control-prev rounded-circle p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            top: "50%",
            left: "-50px",
            transform: "translateY(-50%)",
            width: "50px",
            height: "50px",
          }}
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>

        <button
          className="carousel-control-next rounded-circle p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            top: "50%",
            right: "-50px",
            transform: "translateY(-50%)",
            width: "50px",
            height: "50px",
          }}
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
      <div className="container mt-5">
  <h2 className="mb-4">New and Noteworthy</h2>
  <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-wrap="false">
    <div className="carousel-inner mt-5 py-5">
      {/* First Slide */}
      <div className="carousel-item active">
        <div className="d-flex justify-content-center gap-3">
          {/* Create a col for each image to be in a single row */}
          <div className="col-2 me-2">
            <img src={pic8} className="img-fluid rounded" alt="Slide 1" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Insta Maids</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic9} className="img-fluid rounded" alt="Slide 2" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Wall Panels</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic10} className="img-fluid rounded" alt="Slide 3" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Native Water Purifier</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic11} className="img-fluid rounded" alt="Slide 4" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Native Smart Locks</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic12} className="img-fluid rounded" alt="Slide 5" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Kitchen Cleaning</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="container mt-5">
  <h2 className="mb-4">Most Booked Services</h2>
  <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-wrap="false">
    <div className="carousel-inner mt-5 py-5">
      {/* First Slide */}
      <div className="carousel-item active">
        <div className="d-flex justify-content-center gap-3">
          {/* Create a col for each image to be in a single row */}
          <div className="col-2 me-2">
            <img src={pic8} className="img-fluid rounded" alt="Slide 1" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Insta Maids</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic9} className="img-fluid rounded" alt="Slide 2" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Wall Panels</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic10} className="img-fluid rounded" alt="Slide 3" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Native Water Purifier</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic11} className="img-fluid rounded" alt="Slide 4" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Native Smart Locks</p>
          </div>
          <div className="col-2  me-2">
            <img src={pic12} className="img-fluid rounded" alt="Slide 5" style={{ height: "250px", objectFit: "cover" }} />
            <p className="fw-bold mt-3">Kitchen Cleaning</p>
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


