import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


const UserLayout = () => {
    const navigate=useNavigate();
    const [item,setItem]=useState({});
    
    const [photo, setPhoto] = useState("");
    const defaultPhoto = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png";
    useEffect(() => {
        const storedEmail = localStorage.getItem("Email");
        const storedPhoto = localStorage.getItem("Photo");
    
        if (!storedEmail) {
            navigate("/login");
        } else {
            setItem({ Email: storedEmail });
            fetchUserPhoto(storedEmail);
            // setItem({Photo:storedPhoto || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"});
            
            // setItem(prevState => ({
            //     ...prevState, // पुराना डेटा बचाने के लिए
            //     Email: storedEmail,
            //     Photo: storedPhoto || defaultPhoto
            // }));
            
        }
    }, []);
    const fetchUserPhoto = async (email) => {
        try {
          const response = await fetch("http://localhost:5000/api/getuserphoto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Email: email }),
          });
      
          const data = await response.json();
          if (response.ok) {
            setPhoto(data.Photo || defaultPhoto);  // ✅ अगर `null` आया तो default photo दिखाएगा
            localStorage.setItem("Photo", data.Photo || defaultPhoto);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user photo:", error);
        }
      };
    
    
    
    const handleSignOut=()=>{
       
        localStorage.clear();
    
        navigate("/login");
    }
  return (
//     <div>
      
//       <div class="container-fluid">
//     <div class="row flex-nowrap">
//         <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
//             <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//                 <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
//                     <span class="fs-5 d-none d-sm-inline">Menu</span>
//                 </a>
//                 <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
//                     <li class="nav-item">
//                         <Link to="viewdashbord" class="nav-link align-middle px-0">
//                             <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
//                         <i class="fa-solid fa-table-columns"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </a>
//                         <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
//                             <li class="w-100">
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li>
//                         <a href="#" class="nav-link px-0 align-middle">
//                             <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Orders</span></a>
//                     </li>
//                     <li>
//                         <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
//                             <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Bootstrap</span></a>
//                         <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
//                             <li class="w-100">
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2</a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li>
//                         <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
//                             <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Products</span> </a>
//                             <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
//                             <li class="w-100">
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li>
//                         <a href="#" class="nav-link px-0 align-middle">
//                             <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
//                     </li>
//                     <li>
//     <div className="dropdown pb-4">
//         <a href="#" className="nav-link px-0 align-middle dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//             <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Blogs</span>
//         </a>
//         <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownMenuButton">
           
//             <li><Link className="dropdown-item" to="viewBlogs">View Blogs</Link></li>
//             <li><Link className="dropdown-item" to="addBlogs"> Add Blogs</Link></li>
            
//         </ul>
//     </div>
// </li>

//                 </ul>
//                 <hr/>
//                 <div class="dropdown pb-4">
//                     <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        
//                         <img src={photo||defaultPhoto} alt="hugenerd" width="30" height="30" class="rounded-circle"/>
//                         <span class="d-none d-sm-inline mx-1">{item.Email}</span>
//                     </a>
//                     <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
//                         <li><a class="dropdown-item" href="#">New project...</a></li>
//                         <li><a class="dropdown-item" href="#">Settings</a></li>
//                         <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
//                         <li>
//                             <hr class="dropdown-divider"/>
//                         </li>
//                         <li><a class="dropdown-item" href="#"onClick={handleSignOut} >Sign out</a></li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         {/* Main Dashboard Content */}
//         <div className="col py-3">
//             <Outlet /> {/* ✅ Dashboard content loads here */}
//           </div>
        
//     </div>
// </div>

//     </div>


<div className="container-fluid">
<div className="row flex-nowrap">
  {/* Sidebar */}
  <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar">
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100">
      <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 text-white text-decoration-none">
        <span className="fs-4 d-none d-sm-inline">Dashboard</span>
      </Link>
      <ul className="nav nav-pills flex-column mb-sm-auto mb-0" id="menu">
        <li className="nav-item">
          <Link to="viewdashbord" className="nav-link text-white">
            <i className="bi bi-house-door"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
          </Link>
        </li>
        <li>
          <a href="#submenu1" data-bs-toggle="collapse" className="nav-link text-white">
            <i className="bi bi-columns-gap"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
          </a>
          <ul className="collapse show nav flex-column" id="submenu1">
            <li><a href="#" className="nav-link text-white">Item 1</a></li>
            <li><a href="#" className="nav-link text-white">Item 2</a></li>
          </ul>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-bag"></i> <span className="ms-1 d-none d-sm-inline">Orders</span>
          </a>
        </li>
        <li>
          <a href="#submenu3" data-bs-toggle="collapse" className="nav-link text-white">
            <i className="bi bi-box"></i> <span className="ms-1 d-none d-sm-inline">Products</span>
          </a>
          <ul className="collapse nav flex-column" id="submenu3">
            <li><a href="#" className="nav-link text-white">Product 1</a></li>
            <li><a href="#" className="nav-link text-white">Product 2</a></li>
          </ul>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white">
            <i className="bi bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span>
          </Link>
        </li>
        <li>
          <div className="dropdown">
            <a href="#" className="nav-link text-white dropdown-toggle" data-bs-toggle="dropdown">
              <i className="bi bi-journal"></i> <span className="ms-1 d-none d-sm-inline">Blogs</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><Link className="dropdown-item" to="viewBlogs">View Blogs</Link></li>
              <li><Link className="dropdown-item" to="addBlogs">Add Blogs</Link></li>
            </ul>
          </div>
        </li>
      </ul>
      <hr />
      <div className="dropdown pb-3">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
          <img src={photo || defaultPhoto} alt="User" width="30" height="30" className="rounded-circle" />
          <span className="d-none d-sm-inline mx-2">{item.Email}</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small">
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#" onClick={handleSignOut}>Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
  {/* Main Content */}
  <div className="col py-3 main-content">
    <Outlet />
  </div>
</div>
{/* Responsive CSS */}
<style>
  {`
    .sidebar {
      transition: all 0.3s;
    }
    .sidebar:hover {
      background: #343a40;
    }
    .nav-link {
      transition: all 0.3s;
    }
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .main-content {
      background: #f8f9fa;
      min-height: 100vh;
    }
    @media (max-width: 768px) {
      .sidebar {
        position: absolute;
        width: 200px;
        z-index: 10;
        height: 100vh;
        background: #212529;
      }
    }
  `}
</style>
</div>
  
  )
}

export default UserLayout
