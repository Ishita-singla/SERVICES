import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/count-users");
        const data = await res.json();
        setUserCount(data.count);
        localStorage.setItem("userCount", data.count); // Optional: Store in localStorage
      } catch (err) {
        console.error("Error fetching user count", err);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="col py-3">
      <h2>Admin Dashboard</h2>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '30px'
      }}>
        {/* User Count Card */}
        <div style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#e3f2fd',
          minWidth: '200px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h4>Total Users</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
