// import React,{useEffect,useState} from 'react'

// const Getorders =() => {
//     const [orders,setOrders]=useState([])
//     useEffect(() => {
//         const fetchPendingOrders = async () => {
//           try {
//             const response = await fetch("http://localhost:5000/api/getorders", {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json"
//               }
//             });
    
//             const data = await response.json();
//             setOrders(data.orders); // backend se aane wale orders ko state me daal diya
//           } catch (error) {
//             console.error("Error fetching pending orders:", error);
//           }
//         };
    
//         fetchPendingOrders();
//       }, []);
    
    

//   return (

//     <div className="container mt-4">
//       <h2>Pending Orders</h2>
//       {orders.length === 0 ? (
//         <p>No pending orders found.</p>
//       ) : (
//         orders.map((order, index) => (
//           <div key={index} className="card mb-3 p-3 shadow-sm">
//             <p><strong>Service:</strong> {order.cartItems[0]?.name }</p>
//             <p><strong>Date:</strong> {order.serviceDate}</p>
//             <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
//             <p><strong>User:</strong> {order.userId?.Name || "No name"} ({order.userId?.Email || "No email"})</p>
//             <p><strong>Status:</strong> {order.deliveryStatus}</p>
//           </div>
//         ))
//       )}
//     </div>


// )
// }

// export default Getorders


// import React, { useEffect, useState } from 'react';

// const Getorders = () => {
//   const [orders, setOrders] = useState([]);
//   const [email, setEmail] = useState(""); // selected email

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/getorders");
//         const data = await res.json();
//         setOrders(data.orders);
//       } catch (err) {
//         console.error("Error:", err);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // unique emails
//   const emails = [...new Set(orders.map(o => o.userId?.Email).filter(Boolean))];   //...new Set duplucate emial ko hta deta hia

//   const filtered = email ? orders.filter(o => o.userId?.Email === email) : [];
//   //.filter(...) ka matlab: jo condition match karein, sirf unhi orders ko rakhna.

//   return (
//     <div className="container mt-4">
//       <h3>Select Email to View Orders</h3>

//       {/* Dropdown */}
//       <select
//         className="form-select mb-3"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       >
//         <option value="">-- Select Email --</option>
//         {emails.map((e, i) => (
//           <option key={i} value={e}>{e}</option>
//         ))}
//       </select>

//       {/* Orders for selected email */}
//       {filtered.length === 0 && email && <p>No orders found for this user.</p>}

//       {filtered.map((order, i) => (
//         <div key={i} className="card mb-2 p-3">
//           <p><strong>Services:</strong></p>
//           <ul>
//             {order.cartItems.map((item, idx) => (
//               <li key={idx}>
//                 {item.name} - Quantity: {item.quantity}
//               </li>
//             ))}
//           </ul>
//           <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
//           <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
//           <p><strong>Status:</strong> {order.deliveryStatus}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Getorders;

import React, { useEffect, useState } from 'react';

const Getorders = () => {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOrderId, setLoadingOrderId] = useState(null);



  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getorders");
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const emails = [...new Set(orders.map(o => o.userId?.Email).filter(Boolean))];
  const filtered = email ? orders.filter(o => o.userId?.Email === email) : [];

  const handleReject = async (orderId) => {
    setLoadingOrderId(orderId);
    await fetch(`http://localhost:5000/api/updateorder/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryStatus: "Rejected" })
    });
   await fetchOrders();
   setLoadingOrderId(null);
  };

  // const handleProceed = async (orderId, orderDate) => {
  //   const choice = window.prompt("Choose Delivery Type: fast / normal")?.toLowerCase();
  //   let deliveryDate = new Date(orderDate);

  //   if (choice === "fast") deliveryDate.setDate(deliveryDate.getDate() + 2);
  //   else if (choice === "normal") deliveryDate.setDate(deliveryDate.getDate() + 7);
  //   else return alert("Invalid choice");

  //   await fetch(`http://localhost:5000/api/updateorder/${orderId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       deliveryStatus: "Shipped",
  //       deliveryDate
  //     })
  //   });
  //   fetchOrders();
  // };

  const handleProceed = async (orderId, orderDate, preference) => {
    setLoadingOrderId(orderId);
    let deliveryDate = new Date(orderDate);
  
    if (preference === "fast") {
      deliveryDate.setDate(deliveryDate.getDate() + 2);
    } else {
      deliveryDate.setDate(deliveryDate.getDate() + 7);
    }
  
    await fetch(`http://localhost:5000/api/updateorder/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deliveryStatus: "Shipped",
        deliveryDate
      })
    });
    await fetchOrders();
    setLoadingOrderId(null);
  };
  

  return (
    <div className="container mt-4">
      <h3>Select Email to View Orders</h3>

      <select className="form-select mb-3" value={email} onChange={(e) => setEmail(e.target.value)}>
        <option value="">-- Select Email --</option>
        {emails.map((e, i) => (
          <option key={i} value={e}>{e}</option>
        ))}
      </select>
      {loading && <div className="text-center mt-3">⏳ Please wait...</div>}


      {filtered.length === 0 && email && <p>No orders found for this user.</p>}

      {filtered.map((order, i) => (
        <div key={i} className="card mb-2 p-3">
          <p><strong>Services:</strong></p>
          <ul>
            {order.cartItems.map((item, idx) => (
              <li key={idx}>{item.name} - Quantity: {item.quantity}</li>
            ))}
          </ul>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Delivery Preference:</strong> {order.deliveryPreference || "Not selected"}</p>

          <p><strong>Status:</strong> {order.deliveryStatus}</p>
{order.deliveryDate && (
  <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
)}

          <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
          

          <div className="mt-2 d-flex gap-2">
          <button
  className="btn btn-danger"
  onClick={() => handleReject(order._id)}
  disabled={loadingOrderId === order._id || order.deliveryStatus === "Rejected"}
>
  {loadingOrderId === order._id ? "Processing..." : "Reject"}
</button>

<button
  className="btn btn-success"
  onClick={() => handleProceed(order._id, order.orderDate, order.deliveryPreference)}
  disabled={loadingOrderId === order._id || order.deliveryStatus === "Shipped" || order.deliveryStatus === "Rejected"}
>
  {loadingOrderId === order._id ? "Processing..." : "Proceed"}
</button>


          </div>
        </div>
      ))}
    </div>
  );
};

export default Getorders;

