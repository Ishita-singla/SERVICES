

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const  ViewSmallsubCategoryinFront = () => {
//   const navigate = useNavigate();
//   const { categoryname, subcategoryname } = useParams();
//   const [smallsubcategories, setSmallSubcategories] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [cartcount, setcartcount] = useState(0); // Initialize cartcount state

//   // const userId = localStorage.getItem("USER") || "guest"; // User ID from localStorage or default to 'guest'

//   // useEffect(() => {
//   //   // Fetch data for small subcategories based on categoryname and subcategoryname
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:5001/api/getsubsmallcategory/${categoryname}/${subcategoryname}`);
//   //       setSmallSubcategories(response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchData();

//   //   // Load cart from localStorage


//   //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//   //   const storedCartCount = localStorage.getItem("cartcount") || 0;


//   //   setCart(storedCart);
//   //   setcartcount(Number(storedCartCount));  // Ensure cartcount is a number
//   // }, [categoryname, subcategoryname]);

//   // const handleAddToCart = (item) => {
//   //   const existingItemIndex = cart.findIndex(
//   //     (cartItem) => cartItem.productId === item._id && cartItem.userId === userId && cartItem.status === "pending"
//   //   );

//   //   let updatedCart;
//   //   if (existingItemIndex !== -1) {
//   //     // If item already exists, update quantity and Price
//   //     updatedCart = cart.map((cartItem, index) =>
//   //       index === existingItemIndex
//   //         ? {
//   //             ...cartItem,
//   //             quantity: cartItem.quantity + 1,
//   //             Price: (cartItem.quantity + 1) * item.Price, // Price update
//   //           }
//   //         : cartItem
//   //     );
//   //   } else {
//   //     // Add a new item to the cart
//   //     updatedCart = [
//   //       ...cart,
//   //       {
//   //         productId: item._id,
//   //         userId: userId,
//   //         name: item.smallsubcategoryname,
//   //         image: item.smallsubcategoryimage,
//   //         Price: item.Price,
//   //         quantity: 1,
//   //         status: "pending",
//   //       },
//   //     ];
//   //   }

//   //   // Update the cart and cart count state
//   //   setCart(updatedCart);
//   //   const newCartCount = updatedCart.length;  // Calculate cart count based on updatedCart length
//   //   setcartcount(newCartCount);

//   //   // Store updated cart and cart count in localStorage

//   //   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   //   localStorage.setItem("cartcount", newCartCount);

//   //   // Display success alert
//   //   alert("Item added to cart!");
//   //   console.log(newCartCount);

//   //   // Dispatch event to notify storage change
//   //   window.dispatchEvent(new Event("storage"));
    
//   //   // Navigate to the add to cart page
//   //   navigate("/viewaddtocart");
//   // };

//   // replace
//     // Add near top 
// const email = localStorage.getItem("Email") || "guest";  
// useEffect(() => {
//   // Fetch small subcategories
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5001/api/getsubsmallcategory/${categoryname}/${subcategoryname}`);
//       setSmallSubcategories(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   fetchData();

//   // Load cart for this user
//   const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];//particular user ka data nikana
//   setCart(storedCart);
//   setcartcount(storedCart.length);
// }, [categoryname, subcategoryname, email]);

// const handleAddToCart = (item) => {

//   if(!email){
//     alert("please first login then add to cart");
//     navigate("/login"); // optional: redirect to login
//     return;
//   }
//   const existingItemIndex = cart.findIndex(
//     (cartItem) => cartItem.productId === item._id && cartItem.status === "pending"
//   );

//   let updatedCart;
//   if (existingItemIndex !== -1) {
//     updatedCart = cart.map((cartItem, index) =>
//       index === existingItemIndex
//         ? {
//             ...cartItem,   //pehle waale item ki saari properties copy kar lo (spread operator)
//             quantity: cartItem.quantity + 1,
//             Price: (cartItem.quantity + 1) * item.Price,
//           }
//         : cartItem   //agar nahi (false), to purana item waise ka waise hi le lo

//     );
//   } else {
//     updatedCart = [
//       ...cart,
//       {
//         productId: item._id,
//         userId: email,
//         name: item.smallsubcategoryname,
//         image: item.smallsubcategoryimage,
//         Price: item.Price,
//         quantity: 1,
//         status: "pending",
//       },
//     ];
//   }

//   setCart(updatedCart);
//   setcartcount(updatedCart.length);

//   // Save to localStorage using email
//   localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
//   localStorage.setItem("cartcount", updatedCart.length);
//   window.dispatchEvent(new Event("storage"));

//   alert("Item added to cart!");
//   navigate("/viewaddtocart");
  
// };



//   return (
//     <div className="container mt-4">
    
    
//       <h2 className="text-center mb-4">{subcategoryname} Products</h2>

//       <div className="row">
//         {smallsubcategories.map((item) => (
//           <div className="col-md-4 mb-4" key={item._id}>
//             <div className="card">
//               <img src={item.smallsubcategoryimage} className="card-img-top" alt={item.smallsubcategoryname} />
//               <div className="card-body">
//                 <h5>{item.smallsubcategoryname}</h5>
//                 <p>Price: ₹{item.Price}</p>
//                 <button className="btn btn-primary w-100" onClick={() => handleAddToCart(item)}>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default  ViewSmallsubCategoryinFront;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import api from "../axios";
import "./viewsubcategory.css";
import axios from "axios";

const Viewsmallsubcategory = () => {
  const navigate = useNavigate();
  const { categoryname, subcategoryname } = useParams();
  const [smallsubcategories, setSmallSubcategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartcount, setCartCount] = useState(0);
  const [PriceRange, setPriceRange] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedSmallSubcategory, setSelectedSmallSubcategory] = useState("all");
  const [sortOption, setSortOption] = useState("none"); // For sorting

  const email = localStorage.getItem("Email") || "guest";
  const role = localStorage.getItem("Role");

  useEffect(() => {
    if (role === "admin") {
      alert("Admins are not allowed to access this page.");
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/getsubsmallcategory/${categoryname}/${subcategoryname}`);
        setSmallSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categoryname, subcategoryname]);

  // useEffect(() => {
  //   const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || 0;
  //   setCart(storedCart);
  //   setCartCount(storedCart.length);
  // }, [email]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    setCart(storedCart);
    setCartCount(storedCart.length);
  }, [email]);
  

  // const handleAddToCart = (item) => {
  //   if (role === "admin") {
  //     alert("Admins cannot add items to the cart.");
  //     return;
  //   }

  //   const existingItemIndex = cart.findIndex(
  //     (cartItem) => cartItem.productId === item._id && cartItem.status === "pending"
  //   );

  //   let updatedCart;
  //   if (existingItemIndex !== -1) {
  //     updatedCart = cart.map((cartItem, index) =>
  //       index === existingItemIndex
  //         ? {
  //             ...cartItem,
  //             quantity: cartItem.quantity + 1,
  //             Price: (cartItem.quantity + 1) * item.Price,
  //           }
  //         : cartItem
  //     );
  //   } else {
  //     updatedCart = [
  //       ...cart,
  //       {
  //         productId: item._id,
  //         userId: email,
  //         name: item.smallsubcategoryname,
  //         image: item.smallsubcategoryimage,
  //         Price: item.Price,
  //         quantity: 1,
  //         status: "pending",
  //       },
  //     ];
  //   }

  //   setCart(updatedCart);
  //   setCartCount(updatedCart.length);
  //   localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
  //   // localStorage.setItem("cartcount", updatedCart.length);
  //   localStorage.setItem(`cartcount_${email}`, updatedCart.length);

  //   window.dispatchEvent(new Event("storage"));
  //   alert("Item added to cart!");
  //   navigate("/viewaddtocart");
  // };


  const handleAddToCart = (item) => {
    if (role === "admin") {
      alert("Admins cannot add items to the cart.");
      return;
    }
  
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.productId === item._id && cartItem.status === "pending"
    );
  
    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = cart.map((cartItem, index) =>
        index === existingItemIndex
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              Price: (cartItem.quantity + 1) * item.Price,
            }
          : cartItem
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: item._id,
          userId: email,
          name: item.smallsubcategoryname,
          image: item.smallsubcategoryimage,
          Price: item.Price,
          quantity: 1,
          status: "pending",
        },
      ];
    }
  
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
    localStorage.setItem(`cartcount_${email}`, updatedCart.length);
  
    window.dispatchEvent(new Event("storage"));
    alert("Item added to cart!");
    navigate("/viewaddtocart");
  };
  
  const getFilteredItems = () => {
    let filtered = [...smallsubcategories];

    // Price filter
    switch (PriceRange) {
      case "100-1000":
        filtered = filtered.filter(item => item.Price >= 100 && item.Price <= 1000);
        break;
      case "1000-2000":
        filtered = filtered.filter(item => item.Price > 1000 && item.Price <= 2000);
        break;
      case "2000-3000":
        filtered = filtered.filter(item => item.Price > 2000 && item.Price <= 3000);
        break;
      case "3000-5001":
        filtered = filtered.filter(item => item.Price > 3000 && item.Price <= 5001);
        break;
      case "5001-10000":
        filtered = filtered.filter(item => item.Price > 5001 && item.Price <= 10000);
        break;
      default:
        break;
    }

    // Small subcategory name filter
    if (selectedSmallSubcategory !== "all") {
      filtered = filtered.filter(item => item.smallsubcategoryname === selectedSmallSubcategory);
    }

    // Search filter
    if (searchText.trim() !== "") {
      filtered = filtered.filter(item =>
        item.smallsubcategoryname.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Rating filter

    // Sorting
    if (sortOption === "PriceAsc") {
      filtered = filtered.sort((a, b) => a.Price - b.Price);
    } else if (sortOption === "PriceDesc") {
      filtered = filtered.sort((a, b) => b.Price - a.Price);
    } else if (sortOption === "nameAsc") {
      filtered = filtered.sort((a, b) => a.smallsubcategoryname.localeCompare(b.smallsubcategoryname));
    } else if (sortOption === "nameDesc") {
      filtered = filtered.sort((a, b) => b.smallsubcategoryname.localeCompare(a.smallsubcategoryname));
    }

    return filtered;
  };

  return (
    <div className="view-subcategory-wrapper container mt-4">
      <h2 className="text-center mb-4">{subcategoryname} Products</h2>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 mb-4">
          {/* Search */}
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Search</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Price Filter */}
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Filter by Price</h5>
            <ul className="list-group">
              {[
                ["all", "All Prices"],
                ["100-1000", "₹100 - ₹1000"],
                ["1000-2000", "₹1000 - ₹2000"],
                ["2000-3000", "₹2000 - ₹3000"],
                ["3000-5001", "₹3000 - ₹5001"],
                ["5001-10000", "₹5001 - ₹10000"],
              ].map(([value, label]) => (
                <li
                  key={value}
                  className={`list-group-item ${PriceRange === value ? "active" : ""}`}
                  onClick={() => setPriceRange(value)}
                  style={{ cursor: "pointer" }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Small Subcategory Filter */}
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Filter by Type</h5>
            <select
              className="form-select"
              value={selectedSmallSubcategory}
              onChange={(e) => setSelectedSmallSubcategory(e.target.value)}
            >
              <option value="all">All Types</option>
              {[...new Set(smallsubcategories.map(item => item.smallsubcategoryname))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}

          {/* Sort Options */}
          <div className="card p-3">
            <h5 className="mb-3">Sort By</h5>
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="none">None</option>
              <option value="PriceAsc">Price: Low to High</option>
              <option value="PriceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDesc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products List */}
        <div className="col-md-9">
          <div className="row">
            {getFilteredItems().map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card">
                  <img
                    src={item.smallsubcategoryimage}
                    className="card-img-top"
                    alt={item.smallsubcategoryname}
                  />
                  <div className="card-body">
                    <h5>{item.smallsubcategoryname}</h5>
                    <p>Price: ₹{item.Price}</p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {getFilteredItems().length === 0 && (
              <p className="text-center">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewsmallsubcategory;