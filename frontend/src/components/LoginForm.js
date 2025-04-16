import React, { useState,useEffect } from 'react'
import "./login.css"
import {  Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const[email,setEmail]=useState("");
    const [userInput, setUserInput] = useState("");  

    const [captcha, setCaptcha] = useState(""); 
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    useEffect(() => {
      const user = localStorage.getItem("Email");
      if (user) {
          navigate("/"); 
      }
  }, []);


    useEffect(() => {
      generateCaptcha();
  }, []);
//🔹 useEffect tabhi run hoga jab page load hoga, aur generateCaptcha() function call karega taaki ek naya CAPTCHA dikhe.

// Function to generate a random CAPTCHA
const generateCaptcha = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$&";  
  //🔹 Yeh ek empty string initialize karti hai.
//Iska kaam yeh hai ki jab hum loop chalayein, toh naye characters isme add ho sakein.


  let captchaText = "";
  for (let i = 0; i < 6; i++) {  // Generate a 6-character random string
      captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
      //Math.random() gives 0.374 → 0.374 * 62 = 23.188 → Math.floor(23.188) = 23 → characters.charAt(23) → "X"
//CAPTCHA becomes: "X"


  }
  
  setCaptcha(captchaText);  // Update CAPTCHA state
};


    // ✅ handleLogin function (email और photo set करने के लिए)
  const handleLogin = (name, email,photoURL) => {
    localStorage.removeItem('Email');
    localStorage.removeItem('Photo');
     
    localStorage.setItem('Name', name);
    localStorage.setItem('Email', email);
    localStorage.setItem('Photo', photoURL);
    console.log(email,name);

    // ✅ पहले navigate करो
    //  Navigate('/dashboard');

    // ✅ फिर 500ms बाद page reload करो ताकि सही image update हो जाए
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

    const Submit=async(e)=>{
      e.preventDefault();
      const obj=JSON.stringify({
        Email:email,
        Password:password,
      })
      console.log(obj);

      if (userInput !== captcha) {  
        alert(" Incorrect CAPTCHA! Try again.");
        generateCaptcha();  // Refresh CAPTCHA
        return;  
    }

      try{
        const response=await fetch("http://localhost:5000/api/login",{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:obj,
        });
        const data=await response.json();
        if(response.ok){
          alert("Login Successful");

          // code to get token
          localStorage.setItem("token", data.token);
          localStorage.setItem("Name", data.Name);
          localStorage.setItem("Email", data.Email);
          localStorage.setItem("Role",data.role)
          localStorage.setItem("USER",data.user);
          // localStorage.setItem("User", data.user);

          // ✅ Add this 👇 (store user object with isAdmin)
  localStorage.setItem("user", JSON.stringify({
    name: data.Name,
    email: data.Email,
    isAdmin: data.role === "admin"  // assumes 'role' can be 'admin' or 'user'
  }));

          navigate("/");

          // code end

          setEmail("");
          setPassword("");
          console.log(data);

          // to get pic,email and name on dashbord
          handleLogin(data.Name,data.Email, data.Photo || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png');
           // code end
        }
        else{
          alert("First Signup then login");
        }
      }
      catch(err){
        console.log(err);
      }


    }

  return (
<div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundImage: "linear-gradient(135deg, #00c6ff, #ff00ff)"}}>
  <div className="login-container">
    <h3 className="mb-3">Login</h3>
    <form onSubmit={Submit}>
      <div className="mb-3">
        <label className="form-label">
          <span>&#128100;</span> Username
        </label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control" placeholder="Type your username" />
      </div>
      <div className="mb-3">
        <label className="form-label">
          <span>&#128274;</span> Password
        </label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Type your password" />
      </div>

      <label>CAPTCHA:</label>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ background: "#ddd", padding: "10px", fontSize: "18px", fontWeight: "bold", letterSpacing: "2px", borderRadius: "5px" }}>{captcha}</span>
                        <button type="button" onClick={generateCaptcha} style={{ marginLeft: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}>🔄</button>
                    </div>

                    {/* CAPTCHA Input */}

                    <input 
                        type="text" 
                        placeholder="Enter CAPTCHA" 
                        value={userInput} 
                        onChange={(e) => setUserInput(e.target.value)} 
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
                        required 
                    />
        
      <div className="forgot-password">
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" className="btn btn-primary mt-3">LOGIN</button>

      {/* <div className="social-login">
        <a href="#" className="social-facebook">F</a>
        <a href="#" className="social-twitter">T</a>
        <a href="#" className="social-google">G</a>
      </div> */}
    </form>
    
        <span> Don't have an account?</span><Link to="/signup">Sign Up</Link>
  </div>
</div>


  )
}

export default LoginForm
