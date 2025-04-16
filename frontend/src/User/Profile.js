import React, { useEffect, useState } from "react";

const Profile = () => {
  const [photoPath, setPhotoPath] = useState("");
  const [Email, setEmail] = useState("");

  // 🔹 Default Profile Image
  const defaultPhoto = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png";

  // 🔹 Page reload hone pe localStorage se email aur photo fetch karega
  useEffect(() => {
    const savedEmail = localStorage.getItem("Email");
    console.log("saved email"+savedEmail);
    if (savedEmail) {
      setEmail(savedEmail);
      fetchUserPhoto(savedEmail);
    }
  }, []);

  // 🔹 API Call to get user photo from Database
  
  const fetchUserPhoto = async (Email) => {
    try {
      const response = await fetch("http://localhost:5000/api/getuserphoto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: Email }),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setPhotoPath(data.Photo || defaultPhoto);  // ✅ अगर `null` आया तो default photo दिखाएगा
        localStorage.setItem("Photo", data.Photo || defaultPhoto);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user photo:", error);
    }
  };
  

  // 🔹 Image Upload Function (Cloudinary)

  const uploadPicture = async (imagefile) => {
    if (!imagefile) return;
  
    const data = new FormData();
    data.append("file", imagefile);
    data.append("upload_preset", "person");
    data.append("cloud_name", "ddhm29flq");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddhm29flq/image/upload", {
        method: "POST",
        body: data,
      });
  
      const result = await res.json();
      console.log("Cloudinary Response:", result);
      setPhotoPath(result.url);
      localStorage.setItem("Photo", result.url);
  
      // ✅ अब database में भी save करेंगे
      await fetch("http://localhost:5000/api/uploadimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email, Photo: result.url }),
      });
      console.log("Sending to Backend:", { Email, Photo: result.url });

  
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };
  

  // 🔹 Submit Function (Save Image URL in Database)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/uploadimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: Email, Photo: photoPath }),
      });
  
      // if (response.status === 403) {
      //   alert("❌ You are not registered. Please login first.");
      // } 
      
     
      if (response.ok) {
        const data = await response.json();
        console.log("Backend Response:", data); // ✅ Yeh check karein ki response aa raha hai ya nahi
        setPhotoPath(data.Photo);
        alert("✅ Profile pic updated!");
         
      } else {
        alert("❌ Error in Uploading");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  

  return (
    <div className="row col-lg-12 d-flex justify-content-center align-items-center text-center">
      <div className="card text-center">
        <form className="upload picture" onSubmit={handleSubmit}>
          <div>
            <img
              src={photoPath || defaultPhoto} // Default Image if No Photo Found
              className="card-img-top rounded-circle border mb-3"
              alt="Profile"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <input
            type="file"
            onChange={(e) => uploadPicture(e.target.files[0])}
          />
          <div className="card-body">
            <h5 className="card-title">{Email}</h5>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;