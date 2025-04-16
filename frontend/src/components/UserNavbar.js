import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";


const UserNavbar = () => {
  const placeholders = ["Facial", "AC Service", "Kitchen Cleaning"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0); // ✅ Add cart count state
  const[username,setusername]=useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    // ✅ Fetch initial cart count from localStorage
    const storedCartCount = localStorage.getItem("cartCount") || 0;
    setCartCount(parseInt(storedCartCount));
  
    // ✅ Listen for changes in localStorage
    const handleStorageChange = () => {
      const updatedCartCount = localStorage.getItem("cartCount") || 0;
      setCartCount(parseInt(updatedCartCount));
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(()=>{
    const user=localStorage.getItem("Name");
    if(user){
      setusername(user);
    }
  },[])

  const handleSignOut=()=>{
       
    localStorage.clear();
    setusername(null);
    navigate("/login");
}
  

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
    localStorage.setItem("cartCount", newCount);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand fw-bold" href="#">
          <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg" alt="Logo" height="40" />
        </a>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {/* Location Selector */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="locationDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-geo-alt"></i> Chandigarh, India
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Delhi</a></li>
                <li><a className="dropdown-item" href="#">Mumbai</a></li>
                <li><a className="dropdown-item" href="#">Bangalore</a></li>
              </ul>
            </li>

            {/* Search Bar */}
            <li className="nav-item">
              <form className="d-flex">
                <input className="form-control me-3 px-3 placeholder-slide" type="search" placeholder={`Search for '${placeholders[placeholderIndex]}'`} style={{ width: "250px" }} />
                <button className="btn btn-outline-secondary" type="submit">Search</button>
                <style>
        {`
          @keyframes slide {
            0% { opacity: 0; transform: translateY(10px); }
            50% { opacity: 0.5; transform: translateY(5px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .placeholder-slide::placeholder {
            animation: slide 0.5s ease-in-out;
          }
        `}
      </style>
              </form>
            </li>
          </ul>

          <Link className="nav-link" to="/dashboard"><button>Dashboard</button></Link>




          {/* Right-side Icons */}
          <div className="d-flex">
          <Link className="nav-link" to="frontblogs"><i class="fa-solid fa-blog  me-3" style={{color:"black"}}></i></Link>
            {/* <Link   to="viewaddtocart" style={{color:"black"}}><i class="fa-solid fa-cart-shopping"></i></Link><span className="cart-count">{cartCount}</span> */}
            <div className="d-flex align-items-center cart-container">
  <Link to="viewaddtocart" className="cart-link">
    <i className="fa-solid fa-cart-shopping"></i>
  </Link>
  <span className="cart-count">{cartCount}</span>
</div>

<style>
  {`
    .cart-container {
      display: flex;
      align-items: center;
      position: relative;
    }

    .cart-link {
      color: black;
      font-size: 1.5rem; /* Adjust size if needed */
      position: relative;
    }

    .cart-count {
      background-color: red;
      color: white;
      font-size: 12px;
      font-weight: bold;
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      right: -10px;

    }
  `}
</style>
      {username ? (
        <div className="d-flex align-items-center ">
          <span className="user-circle ms-3">{username.charAt(0).toUpperCase()}</span>
          <button className="btn btn-danger btn-sm-ms-2" onClick={handleSignOut}>Logout</button>
        </div>
      ):(
        <Link to="SignUp"  style={{color:"black"}}><i class="fa-solid fa-user ms-4"></i></Link>

      )
      }
      <style>
        {`.user-circle{
        
        width:35px;
        height:35px;
        color:white;
        background-color:black ;
        display:flex;
        align-items:center;
        border-radius:50%;
        font-weight:bold;
        font-size:18px;
        text-tranform:uppercase
        }`}
      </style>
            

          </div>
        </div>
      </div>
    </nav>
    <Outlet/>
    <Footer/>
    </div>
  );
};

export default UserNavbar;