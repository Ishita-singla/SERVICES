// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [userCount, setUserCount] = useState(0);

//   useEffect(() => {
//     const fetchUserCount = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/count-users");
//         const data = await res.json();
//         setUserCount(data.count);
//         localStorage.setItem("userCount", data.count); // Optional: Store in localStorage
//       } catch (err) {
//         console.error("Error fetching user count", err);
//       }
//     };

//     fetchUserCount();
//   }, []);

//   return (
//     <div className="col py-3">
//       <h2>Admin Dashboard</h2>
      
//       <div style={{
//         display: 'flex',
//         gap: '20px',
//         marginTop: '30px'
//       }}>
//         {/* User Count Card */}
//         <div style={{
//           padding: '20px',
//           borderRadius: '10px',
//           backgroundColor: '#e3f2fd',
//           minWidth: '200px',
//           textAlign: 'center',
//           boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//         }}>
//           <h4>Total Users</h4>
//           <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{userCount}</p>
//         </div>
//       <Link to="/admin/viewusers"> <button>go</button></Link> 
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0); // 👈 New state for blog count
  const [orderStatusCount, setOrderStatusCount] = useState({
    Pending: 0,
    Shipped: 0,
    Delivered: 0,
    Rejected: 0,
  });
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/count-users");
        const data = await res.json();
        setUserCount(data.count);
        localStorage.setItem("userCount", data.count); // optional
      } catch (err) {
        console.error("Error fetching user count", err);
      }
    };
    const fetchBlogCount = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/count-blogs");
        const data = await res.json();
        setBlogCount(data.count);
      } catch (err) {
        console.error("Error fetching blog count", err);
      }
    };
    const fetchOrderStatusCount = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/order-status-count");
        const data = await res.json();
        setOrderStatusCount(data);
      } catch (err) {
        console.error("Error fetching order status count", err);
      }
    };
  
    fetchOrderStatusCount();

    fetchUserCount();
    fetchBlogCount(); // 👈 Call blog count fetch


  
  }, []);

  return (
    <div className="py-3 px-3" style={{ minHeight: "100vh", overflowY: "auto" }}>
      <h2>Admin Dashboard</h2>

      <div className="row mt-4">
        {/* User Count Card */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div className="card shadow-sm" style={{ backgroundColor: "#e3f2fd" }}>
            <div className="card-body text-center">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text display-6 fw-bold">{userCount}</p>
              <Link to="/admin/viewusers" className="btn btn-primary mt-2">View Users</Link>
            </div>
          </div>
        </div>
        {/* Blog Count Card */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div className="card shadow-sm" style={{ backgroundColor: "#f3e5f5" }}>
            <div className="card-body text-center">
              <h5 className="card-title">Total Blogs</h5>
              <p className="card-text display-6 fw-bold">{blogCount}</p>
              <Link to="/admin/viewBlogs" className="btn btn-success mt-2">View Blogs</Link>
            </div>
          </div>
        </div>

        {/* Orders Summary */}
<div className="col-12 col-md-6 mb-3">
  <div className="card shadow-sm" style={{ backgroundColor: "#fff3cd" }}>
    <div className="card-body">
      <h5 className="card-title text-center">Orders Status</h5>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>🕒 Pending:</span> <span>{orderStatusCount.Pending}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>📦 Shipped:</span> <span>{orderStatusCount.Shipped}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>✅ Delivered:</span> <span>{orderStatusCount.Delivered}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>❌ Rejected:</span> <span>{orderStatusCount.Rejected}</span>
        </li>
      </ul>
    </div>
  </div>
</div>

       
      </div>
    </div>
  );
};

export default AdminDashboard;
