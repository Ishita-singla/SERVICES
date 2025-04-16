import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const Submit=async(e)=>{
    e.preventDefault();
    const obj=JSON.stringify({
      Email:email,
      Password:password,
      Name:name
    })
    console.log(obj);
    try{
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: obj, // Ensure JSON data is sent
      });
      const data=await response.json();
      if(response.ok){
        alert("Succesful Signup");
        setEmail("");
        setPassword("");
      } 
      else{
        alert("User already exits. Please sign in again");
      }
    }catch(err){
      console.log("error during signup "+err);
    }

  }
  return (
 <div className="d-flex justify-content-center align-items-center vh-100" >
  <div className="login-container">
  <h3 className="mb-3">SignUp</h3>
  <form onSubmit={Submit}>
  <div className="mb-3">
      <label className="form-label">
         Name
      </label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className="form-control" placeholder="Type your username" />
    </div>
    <div className="mb-3">
      <label className="form-label">
         Username
      </label>
      <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control" placeholder="Type your username" />
    </div>
    <div className="mb-3">
      <label className="form-label">
        Password
      </label>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Type your password" />
    </div>
    <div className="forgot-password">
      <a href="#">Forgot password?</a>
    </div>
    <button type="submit" className="btn btn-primary mt-3">SignUp</button>
    <span> Have an account?</span><Link to="/login">Login</Link>

    {/* <div className="social-login">
      <a href="#" className="social-facebook">F</a>
      <a href="#" className="social-twitter">T</a>
      <a href="#" className="social-google">G</a>
    </div> */}
  </form>
</div>
</div>


)
}



export default SignUpForm
