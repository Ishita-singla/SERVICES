

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const  ViewSmallsubCategoryinFront = () => {
  const navigate = useNavigate();
  const { categoryname, subcategoryname } = useParams();
  const [smallsubcategories, setSmallSubcategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartcount, setcartcount] = useState(0); // Initialize cartcount state

  // const userId = localStorage.getItem("USER") || "guest"; // User ID from localStorage or default to 'guest'

  // useEffect(() => {
  //   // Fetch data for small subcategories based on categoryname and subcategoryname
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/getsubsmallcategory/${categoryname}/${subcategoryname}`);
  //       setSmallSubcategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();

  //   // Load cart from localStorage


  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   const storedCartCount = localStorage.getItem("cartcount") || 0;


  //   setCart(storedCart);
  //   setcartcount(Number(storedCartCount));  // Ensure cartcount is a number
  // }, [categoryname, subcategoryname]);

  // const handleAddToCart = (item) => {
  //   const existingItemIndex = cart.findIndex(
  //     (cartItem) => cartItem.productId === item._id && cartItem.userId === userId && cartItem.status === "pending"
  //   );

  //   let updatedCart;
  //   if (existingItemIndex !== -1) {
  //     // If item already exists, update quantity and price
  //     updatedCart = cart.map((cartItem, index) =>
  //       index === existingItemIndex
  //         ? {
  //             ...cartItem,
  //             quantity: cartItem.quantity + 1,
  //             Price: (cartItem.quantity + 1) * item.Price, // Price update
  //           }
  //         : cartItem
  //     );
  //   } else {
  //     // Add a new item to the cart
  //     updatedCart = [
  //       ...cart,
  //       {
  //         productId: item._id,
  //         userId: userId,
  //         name: item.smallsubcategoryname,
  //         image: item.smallsubcategoryimage,
  //         Price: item.Price,
  //         quantity: 1,
  //         status: "pending",
  //       },
  //     ];
  //   }

  //   // Update the cart and cart count state
  //   setCart(updatedCart);
  //   const newCartCount = updatedCart.length;  // Calculate cart count based on updatedCart length
  //   setcartcount(newCartCount);

  //   // Store updated cart and cart count in localStorage

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   localStorage.setItem("cartcount", newCartCount);

  //   // Display success alert
  //   alert("Item added to cart!");
  //   console.log(newCartCount);

  //   // Dispatch event to notify storage change
  //   window.dispatchEvent(new Event("storage"));
    
  //   // Navigate to the add to cart page
  //   navigate("/viewaddtocart");
  // };

  // replace
    // Add near top 
const email = localStorage.getItem("Email") || "guest";  
useEffect(() => {
  // Fetch small subcategories
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getsubsmallcategory/${categoryname}/${subcategoryname}`);
      setSmallSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();

  // Load cart for this user
  const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];//particular user ka data nikana
  setCart(storedCart);
  setcartcount(storedCart.length);
}, [categoryname, subcategoryname, email]);

const handleAddToCart = (item) => {

  if(!email){
    alert("please first login then add to cart");
    navigate("/login"); // optional: redirect to login
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
            ...cartItem,   //pehle waale item ki saari properties copy kar lo (spread operator)
            quantity: cartItem.quantity + 1,
            Price: (cartItem.quantity + 1) * item.Price,
          }
        : cartItem   //agar nahi (false), to purana item waise ka waise hi le lo

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
  setcartcount(updatedCart.length);

  // Save to localStorage using email
  localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
  localStorage.setItem("cartcount", updatedCart.length);
  window.dispatchEvent(new Event("storage"));

  alert("Item added to cart!");
  navigate("/viewaddtocart");
  
};



  return (
    <div className="container mt-4">
    
    
      <h2 className="text-center mb-4">{subcategoryname} Products</h2>

      <div className="row">
        {smallsubcategories.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card">
              <img src={item.smallsubcategoryimage} className="card-img-top" alt={item.smallsubcategoryname} />
              <div className="card-body">
                <h5>{item.smallsubcategoryname}</h5>
                <p>Price: ₹{item.Price}</p>
                <button className="btn btn-primary w-100" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default  ViewSmallsubCategoryinFront;

