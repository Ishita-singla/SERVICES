import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import UserLayout from "./User/UserLayout";
import UserDashboard from "./User/UserDashboard";
import Profile from "./User/Profile";
import ViewDashbord from "./User/ViewDashbord";
import AddBlogs from "./User/AddBlogs";

import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import Categories from "./Admin/Categories";
import SmallSubCategories from "./Admin/SmallSubCategories";
import SubCategories from "./Admin/SubCategories";
import ViewCategory from "./Admin/ViewCategory";
import ViewSubCategory from "./Admin/ViewSubCategory";
import ViewSamllSubCategory from "./Admin/ViewSmallSubCategory";
import ViewBlogs from "./Admin/ViewBlogs";
import UpdateBlogs from "./Admin/UpdateBlogs";
import UpdateCategory from "./Admin/UpdateCategory";
import UpdateSubCategory from "./Admin/UpdateSubCayegory";
import UpdateSmallSubCategory from "./Admin/UpdateSmallSubCategory";
import ViewSmallsubCategoryinFront from "./components/ViewSmallSubCategoryinFront";
import ViewAddtocart from "./components/viewAddtocart";
import AdminRoute from "./components/AdminRoute";
import ViewOrders from "./Admin/ViewOrders";
import Getorders from "./Admin/GetOrders";
import ViewPastOrders from "./components/ViewPastOrders";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

// import AdminRoute from "./ProtectedRoutes/AdminRoute";  // 👈 import route





function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        {/* ✅ Navbar + Footer only for Home */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="" element={<Footer />} />
          <Route path="frontblogs" element={<Blogs/>}/>
          <Route path="viewaddtocart" element={<ViewAddtocart/>}/>
          <Route path="/viewsmallsubcategory/:categoryname/:subcategoryname" element={<ViewSmallsubCategoryinFront />} />
          <Route path="/past-orders" element={<ViewPastOrders />} />
          <Route path="/about us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs/>} />




        </Route>

        

        {/* ✅ Login & Signup Pages */}
        <Route path="/blogdetail/:id" element={<BlogDetail/>}/>
        <Route path="login" element={<LoginForm />} />
        <Route path="SignUp" element={<SignUpForm />} />


        {/* ✅ Dashboard (No Footer) */}
        
        

        <Route path="dashboard" element={<UserLayout/>}>
  <Route index element={<UserDashboard/>}></Route>
  <Route path="viewdashbord" element={<ViewDashbord/>}></Route>
  
  
  
  

  </Route>

  {/* <Route path="/admindashboard" element={<AdminLayout/>}>
  <Route index element={<AdminDashboard/>}></Route>
  <Route path="addBlogs" element={<AddBlogs/>}></Route>
  <Route path="updateblogs/:id" element={<UpdateBlogs></UpdateBlogs>}></Route>
  
  </Route> */}

  {/* replace with */}
  <Route path="/admindashboard" element={
  <AdminRoute>
    <AdminLayout />
  </AdminRoute>
}>
  <Route index element={<AdminDashboard />} />
  <Route path="addBlogs" element={<AddBlogs />} />
  <Route path="updateblogs/:id" element={<UpdateBlogs />} />
</Route>


  
  {/* <Route path="viewcategory" element={<ViewCategory/>}></Route>
  <Route path="viewsubcategory" element={<ViewSubCategory/>}></Route>
  <Route path="viewsmallsubcategory" element={<ViewSamllSubCategory/>}></Route>
  <Route path="addcategories" element={<Categories/>}></Route>
  <Route path="addsubcategories" element={<SubCategories/>}></Route>
  <Route path="addsmallsubcategories" element={<SmallSubCategories/>}></Route>
  <Route path="viewBlogs" element={<ViewBlogs/>}></Route>
  <Route path="updatecategory/:id" element={<UpdateCategory></UpdateCategory>}></Route>
  <Route path="updatesubcategory/:categoryid/:subcategoryid" element={<UpdateSubCategory></UpdateSubCategory>}></Route>
   //jhan pr jo id ke names hoa woh states vale hai
   <Route path="updatesmallsubcategory/:categoryid/:subcategoryid/:smallsubcategoryid" element={<UpdateSmallSubCategory></UpdateSmallSubCategory>}></Route>



    <Route path="profile" element={<Profile/>}></Route> */}

    {/* replace wth */}
    <Route path="/admin" element={
  <AdminRoute>
    <AdminLayout />
  </AdminRoute>
}>
  <Route path="addcategories" element={<Categories />} />
  <Route path="addsubcategories" element={<SubCategories />} />
  <Route path="addsmallsubcategories" element={<SmallSubCategories />} />
  <Route path="viewcategory" element={<ViewCategory />} />
  <Route path="viewsubcategory" element={<ViewSubCategory />} />
  <Route path="viewsmallsubcategory" element={<ViewSamllSubCategory />} />
  <Route path="viewBlogs" element={<ViewBlogs />} />
  <Route path="updatecategory/:id" element={<UpdateCategory />} />
  <Route path="updatesubcategory/:categoryid/:subcategoryid" element={<UpdateSubCategory />} />
  <Route path="updatesmallsubcategory/:categoryid/:subcategoryid/:smallsubcategoryid" element={<UpdateSmallSubCategory />} />
  <Route path="vieworders" element={<ViewOrders/>}></Route>
  <Route path="getordersinadmin" element={<Getorders></Getorders>}></Route>
</Route>




        
      </Routes>
    </BrowserRouter>

    </>
  );
}


export default App;
