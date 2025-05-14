// // import { useState, useContext } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // // import { CartContext } from './CartContext';

// // const Checkout = () => {
// // //   const { userId } = useParams();
// // const userId = localStorage.getItem("USER");

// //   const [cartItems, setCartItems] = useState([]);

// // //   const { cartItems, clearCart } = useContext(CartContext);
// //   const navigate = useNavigate();
  
// //   const [address, setAddress] = useState({
// //     name: '',
// //     street: '',
// //     city: '',
// //     postalCode: '',
// //     country: ''
// //   });
// //   const clearCart = () => {
// //     setCartItems([]);
// //   };

// //   const handleChange = (e) => {
// //     setAddress({ ...address, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log("Submit clicked ✅"); // 👈 ye line lagao


// //     console.log("Cart Items:", cartItems); // 👈 Check this
// //     if (cartItems.length === 0) {
// //       alert("Cart is empty!");
// //       return;
// //     }
  

// //     const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
// //     const items = cartItems.map(item => ({
// //       productId: item._id,
// //       quantity: item.quantity
// //     }));

// //     // Step 1: Create Order
// //   const orderRes = await fetch('http://localhost:5001/placeorder', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ userId, items, shippingAddress: address, totalAmount })
// //   });

// //   const orderData = await orderRes.json();
// //   if (orderRes.ok) {
// //     // Step 2: Open Razorpay Payment Window
// //     const options = {
// //       key: 'rzp_test_99IwqPHWTFKkXS', // 🔥 Replace with your real Razorpay key
// //       amount: totalAmount * 100, // Amount in paise
// //       currency: "INR",
// //       name: "Softwizz",
// //       description: "Order Payment",
// //       handler: async function (response) {
// //         // Payment successful

// //         // Step 3: Update backend with payment success
// //         const paymentRes = await fetch(`http://localhost:5001/updatepayment/${orderData._id}`, {
// //           method: 'PUT',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             paymentId: response.razorpay_payment_id,
// //             paymentStatus: 'Paid'
// //           })
// //         });

// //         if (paymentRes.ok) {
// //           alert('Payment Successful!');
// //           clearCart();
// //           navigate('/'); // or Thank You page
// //         } else {
// //           alert('Payment captured but failed to update order.');
// //         }
// //       },
// //       prefill: {
// //         name: address.name,
// //         email: 'user@example.com', // optional
// //         contact: '9999999999' // optional
// //       },
// //       theme: {
// //         color: "#3399cc"
// //       }
// //     };
    
// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   } else {
// //     alert('Failed to create order. Try again.');
// //   }
// // };


// //   return (
// //     <div className="container mt-5">
// //       <h2 className="mb-4">Checkout</h2>
// //       <form className="row g-3" onSubmit={handleSubmit}>
// //         <div className="col-md-6">
// //           <label htmlFor="name" className="form-label">Full Name</label>
// //           <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
// //         </div>
        
// //         <div className="col-12">
// //           <label htmlFor="street" className="form-label">Street Address</label>
// //           <input type="text" className="form-control" id="street" name="street" onChange={handleChange} required />
// //         </div>
        
// //         <div className="col-md-6">
// //           <label htmlFor="city" className="form-label">City</label>
// //           <input type="text" className="form-control" id="city" name="city" onChange={handleChange} required />
// //         </div>
        
// //         <div className="col-md-4">
// //           <label htmlFor="postalCode" className="form-label">Postal Code</label>
// //           <input type="text" className="form-control" id="postalCode" name="postalCode" onChange={handleChange} required />
// //         </div>
        
// //         <div className="col-md-2">
// //           <label htmlFor="country" className="form-label">Country</label>
// //           <input type="text" className="form-control" id="country" name="country" onChange={handleChange} required />
// //         </div>

// //         <div className="col-12">
// //           <button type="submit" className="btn btn-primary w-100">Submit Order</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Checkout;
// // import { useEffect, useState } from 'react';
// // import { useNavigate,useLocation } from 'react-router-dom';

// // const Checkout = () => {
// //   const location = useLocation();
// //   const { deliveryPreference, totalAmount, finalAmount } = location.state || {};

// //   const userId = localStorage.getItem("USER");  // USER ID get karo
// //   localStorage.setItem("cart_" + userId, JSON.stringify(cartData)); // cart ko userId ke saath store karo

// //   const navigate = useNavigate();

// //   const [cartItems, setCartItems] = useState([]);
// //   const [address, setAddress] = useState({
// //     name: '',
// //     street: '',
// //     city: '',
// //     postalCode: '',
// //     country: ''
// //   });
// //   useEffect(() => {
// //     const userId = localStorage.getItem("USER");
// //     const storedCart = localStorage.getItem("cart_" + userId);
// //     if (storedCart) {
// //       setCartItems(JSON.parse(storedCart));
// //     }
// //   }, []);
  

// //   // ✅ Load cart from localStorage
// //   useEffect(() => {
// //     if (userId) {
// //       const savedCart = localStorage.getItem(`cart_${userId}`);
// //       if (savedCart) {
// //         try {
// //           setCartItems(JSON.parse(savedCart));
// //         } catch (err) {
// //           console.error("Failed to parse cart JSON", err);
// //         }
// //       }
// //     }
// //   }, [userId]);

// //   // const clearCart = () => {
// //   //   localStorage.removeItem(`cart_${userId}`);
// //   //   setCartItems([]);
// //   // };
// //   const clearCart = () => {
// //     const userId = localStorage.getItem("USER");
// //     localStorage.removeItem("cart_" + userId);
// //     localStorage.setItem("cartcount", 0);
// //     window.dispatchEvent(new Event("storage"));
// //     setCartItems([]);
// //   };
  

// //   const handleChange = (e) => {
// //     setAddress({ ...address, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log("Submit clicked ✅");
// //     console.log("Cart Items:", cartItems);

// //     if (cartItems.length === 0) {
// //       alert("Cart is empty!");
// //       return;
// //     }

// //     const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

// //     // Step 1: Place order
// //     // const orderRes = await fetch('http://localhost:5001/placeorder', {
// //     //   method: 'POST',
// //     //   headers: { 'Content-Type': 'application/json' },
// //     //   body: JSON.stringify({
// //     //     userId,
// //     //     cartItems, // sending full cartItems as per your Mongoose schema
// //     //     shippingAddress: address,
// //     //     totalAmount
// //     //   })
// //     // });

// //     const orderRes = await fetch('http://localhost:5001/placeorder', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({
// //         userId,
// //         cartItems,
// //         shippingAddress: address,
// //         deliveryPreference,
// //         totalAmount: finalAmount
// //       })
// //     });
    
// //     const orderData = await orderRes.json();

// //     if (orderRes.ok) {
// //       const options = {
// //         key: 'rzp_test_99IwqPHWTFKkXS',
// //         amount: finalAmount * 100,
// //         currency: "INR",
// //         name: "Softwizz",
// //         description: "Order Payment",
// //         handler: async function (response) {
// //           const paymentRes = await fetch(`http://localhost:5001/updatepayment/${orderData._id}`, {
// //             method: 'PUT',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({
// //               paymentId: response.razorpay_payment_id,
// //               paymentStatus: 'Paid'
// //             })
// //           });

// //           if (paymentRes.ok) {
// //             alert('Payment Successful!');
// //             clearCart();
// //             localStorage.setItem("cartcount", 0);
// // window.dispatchEvent(new Event("storage"));
// // navigate("/thankyou"); // or redirect wherever you want
           
// //           } else {
// //             alert('Payment captured but failed to update order.');
// //           }
// //         },
// //         prefill: {
// //           name: address.name,
// //           email: 'user@example.com',
// //           contact: '9999999999'
// //         },
// //         theme: {
// //           color: "#3399cc"
// //         }
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //     } else {
// //       alert('Failed to create order. Try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="mb-4">Checkout</h2>
// //       {cartItems.length > 0 ? (
// //         cartItems.map((item, index) => (
// //           <div key={index}>
// //             <p>Product: {item.productName}</p>
// //             <p>Quantity: {item.quantity}</p>
// //           </div>
// //         ))
// //       ) : (
// //         <p>Your cart is empty.</p>
// //       )}
// //       <form className="row g-3" onSubmit={handleSubmit}>
// //         <div className="col-md-6">
// //           <label htmlFor="name" className="form-label">Full Name</label>
// //           <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
// //         </div>

// //         <div className="col-12">
// //           <label htmlFor="street" className="form-label">Street Address</label>
// //           <input type="text" className="form-control" id="street" name="street" onChange={handleChange} required />
// //         </div>

// //         <div className="col-md-6">
// //           <label htmlFor="city" className="form-label">City</label>
// //           <input type="text" className="form-control" id="city" name="city" onChange={handleChange} required />
// //         </div>

// //         <div className="col-md-4">
// //           <label htmlFor="postalCode" className="form-label">Postal Code</label>
// //           <input type="text" className="form-control" id="postalCode" name="postalCode" onChange={handleChange} required />
// //         </div>

// //         <div className="col-md-2">
// //           <label htmlFor="country" className="form-label">Country</label>
// //           <input type="text" className="form-control" id="country" name="country" onChange={handleChange} required />
// //         </div>

// //         <div className="col-12">
// //           <button type="submit" className="btn btn-primary w-100">Submit Order</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Checkout;
// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Checkout = () => {
//   const location = useLocation();
//   const { deliveryPreference, totalAmount, finalAmount } = location.state || {};
//   const userId = localStorage.getItem("USER"); // USER ID get karo

//   const [cartItems, setCartItems] = useState([]);
//   const [address, setAddress] = useState({
//     name: '',
//     street: '',
//     city: '',
//     postalCode: '',
//     country: ''
//   });

//   const navigate = useNavigate();

//   // Load cart items from localStorage on component mount
//   useEffect(() => {
//     if (userId) {
//       const storedCart = localStorage.getItem(`cart_${userId}`);
//       if (storedCart) {
//         try {
//           const parsedCart = JSON.parse(storedCart); 
//           console.log("Loaded Cart Items:", parsedCart); // Log to verify cart items
//           setCartItems(parsedCart); // Setting cart items in state
//         } catch (err) {
//           console.error("Failed to parse cart JSON", err);
//         }
//       } else {
//         console.log("No cart found in localStorage for this user");
//       }
//     }
//   }, [userId]);

//   // Updating localStorage when cartItems changes
//   useEffect(() => {
//     if (cartItems.length > 0) {
//       localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems)); // Update cart in localStorage
//     }
//   }, [cartItems, userId]);

//   // Handle address input change
//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   // Handle form submission for placing the order
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submit clicked ✅");
//     console.log("Cart Items:", cartItems);

//     if (cartItems.length === 0) {
//       alert("Cart is empty!");
//       return;
//     }

//     const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

//     // Step 1: Place order
//     const orderRes = await fetch('http://localhost:5001/placeorder', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         userId,
//         cartItems,
//         shippingAddress: address,
//         deliveryPreference,
//         totalAmount: finalAmount
//       })
//     });

//     const orderData = await orderRes.json();

//     if (orderRes.ok) {
//       const options = {
//         key: 'rzp_test_99IwqPHWTFKkXS',
//         amount: finalAmount * 100,
//         currency: "INR",
//         name: "Softwizz",
//         description: "Order Payment",
//         handler: async function (response) {
//           const paymentRes = await fetch(`http://localhost:5001/updatepayment/${orderData._id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               paymentId: response.razorpay_payment_id,
//               paymentStatus: 'Paid'
//             })
//           });

//           if (paymentRes.ok) {
//             alert('Payment Successful!');
//             clearCart();
//             localStorage.setItem("cartcount", 0);
//             window.dispatchEvent(new Event("storage"));
//             navigate("/thankyou"); // Redirect to thank you page
//           } else {
//             alert('Payment captured but failed to update order.');
//           }
//         },
//         prefill: {
//           name: address.name,
//           email: 'user@example.com',
//           contact: '9999999999'
//         },
//         theme: {
//           color: "#3399cc"
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } else {
//       alert('Failed to create order. Try again.');
//     }
//   };

//   // Clear cart and reset the localStorage
//   const clearCart = () => {
//     localStorage.removeItem(`cart_${userId}`);
//     localStorage.setItem("cartcount", 0);
//     window.dispatchEvent(new Event("storage"));
//     setCartItems([]); // Reset cart items state
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Checkout</h2>
//       {cartItems.length > 0 ? (
//         cartItems.map((item, index) => (
//           <div key={index}>
//             <p>Product: {item.productName}</p>
//             <p>Quantity: {item.quantity}</p>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty.</p>
//       )}

//       <form className="row g-3" onSubmit={handleSubmit}>
//         <div className="col-md-6">
//           <label htmlFor="name" className="form-label">Full Name</label>
//           <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
//         </div>

//         <div className="col-12">
//           <label htmlFor="street" className="form-label">Street Address</label>
//           <input type="text" className="form-control" id="street" name="street" onChange={handleChange} required />
//         </div>

//         <div className="col-md-6">
//           <label htmlFor="city" className="form-label">City</label>
//           <input type="text" className="form-control" id="city" name="city" onChange={handleChange} required />
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="postalCode" className="form-label">Postal Code</label>
//           <input type="text" className="form-control" id="postalCode" name="postalCode" onChange={handleChange} required />
//         </div>

//         <div className="col-md-2">
//           <label htmlFor="country" className="form-label">Country</label>
//           <input type="text" className="form-control" id="country" name="country" onChange={handleChange} required />
//         </div>

//         <div className="col-12">
//           <button type="submit" className="btn btn-primary w-100">Submit Order</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Checkout;
