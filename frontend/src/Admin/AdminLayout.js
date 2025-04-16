import React, { useEffect, useState } from 'react'
import { Outlet,Link, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
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
       
    }
}, []);
const fetchUserPhoto = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/getUser", {
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

    navigate("/blog");
}
  return (
      
    <div>
      <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <Link to="/admin/Enquiry" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li>
                    <div className="dropdown pb-4">
        <a href="#" className="nav-link px-0 align-middle dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownMenuButton">
           
            <li><Link className="dropdown-item" to="/admin/viewcategory">Categories Dashboard</Link></li>
            <li><Link className="dropdown-item" to="/admin/viewsubcategory"> Sub-Categories Dashboard</Link></li>
            <li><Link className="dropdown-item" to="/admin/viewsmallsubcategory"> Small-Sub-Categories Dashboard</Link></li>
            <li><Link className="dropdown-item" to="/admin/vieworders"> order Dashboard</Link></li>

        </ul>
    </div>
                    </li>
                    <li>
                    <div className="dropdown pb-4">
        <a href="#" className="nav-link px-0 align-middle dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Blogs</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownMenuButton">
           
            <li><Link className="dropdown-item" to="/admindashboard/addBlogs">Add Blogs</Link></li>
            <li><Link className="dropdown-item" to="/admin/viewBlogs"> View Blogs</Link></li>
            
        </ul>
    </div>
                    </li>

                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Products</span> </a>
                            <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link  to="/admin/getordersinadmin"class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customer  Orders</span> </Link>
                    </li>
                    <li>
    <div className="dropdown pb-4">
        <a href="#" className="nav-link px-0 align-middle dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Categories</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownMenuButton">
           
            <li><Link className="dropdown-item" to="/admin/addcategories">Categories</Link></li>
            <li><Link className="dropdown-item" to="/admin/addsubcategories"> Sub-Categories</Link></li>
            <li><Link className="dropdown-item" to="/admin/addsmallsubcategories"> Small-Sub-Categories</Link></li>
            
        </ul>
    </div>
</li>

                </ul>
                <hr/>
                <div class="dropdown pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        
                        <img src={photo||defaultPhoto} alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                        <span class="d-none d-sm-inline mx-1">{item.Email}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><Link class="dropdown-item" to="/admin/profile">Profile</Link></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" href="#" onClick={handleSignOut}>Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <Outlet/> 
        
    </div>
</div>

    </div>
  )
}

export default AdminLayout
