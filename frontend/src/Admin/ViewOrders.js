// import React, { useState, useEffect } from "react";

// const ViewOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     const res = await fetch("http://localhost:5001/api/orderplaced",{
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
       
//       }); 
//     const data = await res.json();
//     setOrders(data.orders);
//   };

//   const setDeliveryDate = async (orderId, deliveryDate) => {
//     try {
//       const response = await fetch(`http://localhost:5001/api/set-delivery-date/${orderId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ deliveryDate }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Delivery date set successfully");
//         console.log(data.order);
//         fetchOrders(); // refresh list
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Failed to set delivery date:", error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Admin Orders</h2>
//       {orders.map((order) => (
//         <div key={order._id} className="border p-4 mb-4">
//           <p>User ID: {order.userId}</p>
//           <p>Total: ₹{order.totalAmount}</p>
//           <p>Status: {order.deliveryStatus}</p>
//           <p>
//             Delivery Date:{" "}
//             {order.deliveryDate
//               ? new Date(order.deliveryDate).toLocaleDateString()
//               : "Not set"}
//           </p>

//           <input
//             type="date"
//             onChange={(e) => setDeliveryDate(order._id, e.target.value)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewOrders;
