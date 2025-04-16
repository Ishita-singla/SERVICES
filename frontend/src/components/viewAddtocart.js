// import React, { useEffect, useState } from 'react'
// import axios from "axios";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { Link } from 'react-router-dom';

// const ViewAddtocart = () => {
//     const [items,setItems]=useState([]);
//     const [show, setShow] = useState(false);
//     const [deleteId, setDeleteId] = useState(null);


    
//     const fetchData=async()=>{
//         try{
//             const response=await axios.get("http://localhost:5000/api/viewaddtocart");
//             console.log("cart data",response.data);
//             setItems(response.data);
//         }catch(err){
//             console.log("error during fetching blogs data",err);
//         }
//     };
//     useEffect(()=>{
//         fetchData();
//         },[]);
         
        
//     // डिलीट करने के लिए Modal Open करें
//     const handleShow = (id) => {
//         console.log("Item to be deleted:", id);
//         setDeleteId(id);
//         setShow(true);
//     };

//     // डिलीट कन्फर्म करें
//     const deleteItem = async () => {
//         if (!deleteId) {
//             console.log("No item selected for deletion.");
//             return;
//         }

//         try {
//             console.log("Deleting item:", deleteId);
//             await axios.delete(`http://localhost:5000/api/deleteitem/${deleteId}`);

//             // डिलीट होने के बाद UI अपडेट करें
//             setItems(items.filter((item) => item._id !== deleteId));
//             setShow(false); // Modal बंद करें
//         } catch (err) {
//             console.log("Error deleting item:", err);
//         }
//     };


//   return (
//     <div className="container my-5">
//     <h2 className="text-center mb-4">Cart items</h2>
//     <div className="row">
//         {items.map((item) => (
//             <div key={item._id} className="col-md-4 mb-4">
//                 <div className="card h-100">
//                     <img src={item.smallsubcategoryimage}  className="card-img-top p-5" style={{ height: "250px", width: "100%", objectFit: "cover" }}  />
//                     <div className="card-body">
//                     <h5 className="card-title">{item.subcategoryname}</h5>


//                         <h5 className="card-title">{item.smallsubcategoryname}</h5>
//                         <h5 className="card-text">{item.Price}</h5>
//                         <div className="mb-0 d-flex  ">
//                             {/* <Link to={`/blogdetail/${item._id}`} className="btn btn-primary btn-sm">
                            
//                                 Read More
//                             </Link> */}
//                             <button className="btn btn-danger btn-sm" onClick={() => handleShow(item._id)}>
//                                 Remove
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         ))}
//     </div>
//     {/* Delete Confirmation Modal */}
//     <Modal show={show} onHide={() => setShow(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Delete</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShow(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="danger" onClick={deleteItem}>
//                         Delete
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
        
// </div>

//   )
// }


// export default ViewAddtocart;




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAddtocart = () => {
  const [cart, setCart] = useState([]);
  const [cartcount, setcartcount] = useState(0); // Initialize cartcount state
  const [orderplaced,setorderplaced]=useState(false);
  const [deliveryPreference, setDeliveryPreference] = useState("normal");


  // useEffect(() => {
  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCart(storedCart);
  // }, []);

  // const updateCart = (updatedCart) => {
  //   setCart(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  // replace
  const email = localStorage.getItem("Email") || "guest";

  

useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
  setCart(storedCart);
}, [email]);

const updateCart = (updatedCart) => {
  setCart(updatedCart);
  localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
  localStorage.setItem("cartcount", updatedCart.length);
  window.dispatchEvent(new Event("storage"));
};


  const handleIncreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? { ...item, quantity: item.quantity + 1, Price: (item.quantity + 1) * (item.Price / item.quantity) }
        : item
    );
    updateCart(updatedCart);
  };




const handleDecreaseQuantity = (index) => {
    const updatedCart = cart
      .map((item, i) => {
        if (i === index) {
          const newQuantity = item.quantity - 1;
          if (newQuantity === 0) return null; // Mark for removal
          return { 
            ...item, 
            quantity: newQuantity, 
            Price: (newQuantity * (item.Price / item.quantity)).toFixed(2) 
          };
        }
        return item;
      })
      .filter(item => item !== null); // Remove items marked as null
  
    updateCart(updatedCart);

    const newCartCount = updatedCart.length;  // Calculate cart count based on updatedCart length
    setcartcount(newCartCount);

    // Store updated cart and cart count in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartcount", newCartCount);

    window.dispatchEvent(new Event("storage"));

  };
  
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("USER");
  
    if (!userId || cart.length === 0) {
      alert("Invalid order data. Please log in and add items.");
      return;
    }
    const extracharge=deliveryPreference==="Fast"? 50 :0;
    const finalAmount=parseFloat(totalAmount)+extracharge;
    
    try {
      const response = await fetch("http://localhost:5000/api/orderplaced", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cartItems: cart,
          totalAmount:finalAmount,
          deliveryPreference, // <== ADD THIS LINE
          userEmail:localStorage.getItem("Email"),
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        alert(data.message);
        // Reset cart
        localStorage.removeItem(`cart_${email}`);
        localStorage.setItem("cartcount", 0);
        setCart([]);
        setcartcount(0);
        setorderplaced(true);
        window.dispatchEvent(new Event("storage"));
      } else {
        alert(data.message || "Order not placed");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Order placement error:", error);
    }
  };

  const totalAmount= cart
  .reduce((acc, item) => acc + Number(item.Price), 0)
  .toFixed(2);

  return (
    // <div className="container my-5">
    //   <h2 className="text-center mb-4">Your Cart</h2>
    //   {cart.length === 0 ? (
    //     <p className="text-center">Your cart is empty.</p>
    //   ) : (
    //     <div className="row">
    //       {cart.map((item, index) => (
    //         <div key={index} className="col-md-4 mb-4">
    //           <div className="card">
    //             <img src={item.image} className="card-img-top" alt={item.name} />
    //             <div className="card-body">
    //               <h5>{item.name}</h5>
    //               <p>Price: ₹{item.Price}</p>
    //               <p>Quantity: {item.quantity}</p>
                  
    //               <div className="d-flex justify-content-between">
    //                 <button className="btn btn-sm btn-success" onClick={() => handleIncreaseQuantity(index)}>+</button>
    //                 <button className="btn btn-sm btn-warning" onClick={() => handleDecreaseQuantity(index)}>-</button>
    //                 <button className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
          
    //     </div>
        
    //   )}
    // </div>

//     <div className="container my-5">
//   <h2 className="text-center mb-4">Your Cart</h2>
//   {cart.length === 0 ? (
//     <p className="text-center">Your cart is empty.</p>
//   ) : (
//     <div className="row">
      

//       {/* t Column: Cart Items */}
//       <div className="col-md-8">
//         <div className="row">
//           {cart.map((item, index) => (
//             <div key={index} className="col-md-6 mb-4">
//               <div className="card">
//                 <img src={item.image} className="card-img-top" alt={item.name} />
//                 <div className="card-body">
//                   <h5>{item.name}</h5>
//                   <p>Price: ₹{item.Price}</p>
//                   <p>Quantity: {item.quantity}</p>

//                   <div className="d-flex justify-content-between">
//                     <button className="btn btn-sm btn-success" onClick={() => handleIncreaseQuantity(index)}>+</button>
//                     <button className="btn btn-sm btn-warning" onClick={() => handleDecreaseQuantity(index)}>-</button>
//                     <button className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* right Column: Cart Summary */}
      
// <div className="col-md-4 mb-4">
//   <div className="card p-3">
//     <h5 className="mb-3">Cart Summary</h5>
//     <ul className="list-group mb-3">
//       {cart.map((item, index) => (
//         <li key={index} className="list-group-item d-flex justify-content-between">
//           <span>{item.name} </span>
//           <span>₹{Number(item.Price).toFixed(2)}</span>
//         </li>
//       ))}
//     </ul>
//     {/* <h6 className="text-end">
//       Total: ₹{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(
//         cart.reduce((acc, item) => acc + Number(item.Price), 0)
//       )}
//     </h6> */}
//     <h6 className="text-end">
//   Total: ₹{cart.reduce((acc, item) => acc + Number(item.Price), 0).toFixed(2)}
// </h6>

//   </div>
// </div>

//     </div>
//   )}
// </div>

<div className="container my-5">
  <h2 className="text-center mb-4">Your Cart</h2>

  {cart.length === 0 ? (
  <div className="text-center">
  <p>{orderplaced ? "Your order is placed." : "Your cart is empty."}</p>
  <Link
    to="/past-orders" 
    className="btn btn-primary mt-2"
    style={{ textDecoration: "none" }}
  >
    View Past Orders
  </Link>
</div>

  
) : (

    <div className="row">
      {/* Left Column: Cart Items */}
      <div className="col-md-8">
        {cart.map((item, index) => (
          <div key={index} className="d-flex mb-4 border rounded p-3 shadow-sm">
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />

            {/* Details */}
            <div className="ms-3 flex-grow-1">
              <h5>{item.name}</h5>
              <p className="mb-1">Price: ₹{Number(item.Price).toFixed(2)}</p>
              <p className="mb-2">Quantity: {item.quantity}</p>

             

<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
  <button
    style={{
      width: "32px",
      height: "32px",
      border: "1px solid #c2c2c2",
      backgroundColor: "#fff",
      color: "#333",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#f8f8f8")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
    onClick={() => handleDecreaseQuantity(index)}
  >
    −
  </button>

  <div
    style={{
      width: "40px",
      height: "32px",
      border: "1px solid #c2c2c2",
      textAlign: "center",
      lineHeight: "30px",
      borderRadius: "4px",
      fontWeight: "500",
    }}
  >
    {item.quantity}
  </div>

  <button
    style={{
      width: "32px",
      height: "32px",
      border: "1px solid #c2c2c2",
      backgroundColor: "#fff",
      color: "#333",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#f8f8f8")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
    onClick={() => handleIncreaseQuantity(index)}
  >
    +
  </button>

  <button
    className="btn btn-sm btn-danger ms-3"
    onClick={() => handleRemoveItem(index)}
  >
    Remove
  </button>
</div>

            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Cart Summary */}
      <div className="col-md-4 mb-4">
        <div className="card p-3 shadow-sm">
          <h5 className="mb-3">Cart Summary</h5>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <span>{item.name}</span>
                <span>₹{Number(item.Price).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          

          <div className="mb-3">
  <label htmlFor="deliveryPreference" className="form-label">
    Delivery Preference
  </label>
  <select
    id="deliveryPreference"
    className="form-select"
    value={deliveryPreference}
    onChange={(e) => setDeliveryPreference(e.target.value)}
  >
    <option value="normal">Normal (Free,7 Days)</option>
    <option value="Fast">Fast (Rs.50, 2 Days)</option>
  </select>
</div>
<h6 className="text-end">
            Total: ₹
            {(parseFloat(totalAmount)+(deliveryPreference==="Fast"?50:0)).toFixed(2)}
          </h6>

          <button
    style={{
      width: "100%",
      backgroundColor: "#fb641b",
      color: "#fff",
      border: "none",
      borderRadius: "2px",
      padding: "12px 0",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      marginTop: "16px"
    }}
    onClick={handlePlaceOrder}
  >
    PLACE ORDER
  </button>
        </div>
      </div>
    </div>
  )}
</div>


  );
};

export default ViewAddtocart;
