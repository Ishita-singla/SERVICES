import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

const UpdateCategory = () => {
    const [categorytitle, setcategoryTitle] = useState("");
      const [photo, setPhoto] = useState("");
      const [photourl, setPhotourl] = useState("");
      const [items,setitems]=useState({});
      let {id}=useParams();

      
          
  useEffect(()=>{
    // 1️⃣ Ek object bana rahe hain jo backend ko bhejna hai
      const formData = JSON.stringify({
          id:id
      });
           fetch(`http://localhost:5001/api/category`,{
              headers:{
                  "Content-type":"application/json"
              },
              method: "POST",
              body: formData,
            })
           .then(response=>response.json())
           // .then(data=>console.log(data))
           .then(data => {
            console.log("Fetched Category Data:", data); // ✅ Debugging
            setitems(data);
          })
           .catch(err=>console.log(err))
       },[id]);
  
    
    useEffect(() => {
  if (items && Object.keys(items).length > 0) { // ✅ Ensure items is not empty
    console.log("Setting State with Data:", items);
    setcategoryTitle(items.categoryname || "");  // ✅ Ensure no undefined values
    setPhotourl(items.categoryimage || "");// jhan or name and image odel vali deni hai
  }
}, [items]);

      
    

     
      useEffect(() => {
        console.log("Selected Photo:", photo); // Debugging
         if (photo) {
           Upload(photo);
         }
       }, [photo]);
       
       
       const Upload=async(photo)=>{
         if(!photo){
             alert("please select a photo")
             return;
         }
         const data = new FormData();
         data.append("file", photo);
         data.append("upload_preset", "person");
         data.append("cloud_name", "ddhm29flq");
         fetch("https://api.cloudinary.com/v1_1/ddhm29flq/image/upload", {
             method: "POST",
             body: data,
           })
             .then((res) => res.json())
             .then((data) => {
               if (data.url) {
                 setPhotourl(data.url);
                 localStorage.setitems("photo", data.url);
                 // alert("Photo uploaded successfully");
               } else {
                 alert("Failed to upload photo");
               }
             })
             .catch((err) => {
               console.error("Upload error:", err);
               alert("Error uploading photo");
             });
         };
     
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("categorytitle:", categorytitle);
    console.log("photourl:", photourl);
        if (!categorytitle || !photourl) {
            alert("All fields are required");
            return;
        }
        alert("Submitting Category...");
        try {
            const response = await fetch("http://localhost:5001/api/updatecategory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id,categoryname: categorytitle, categoryimage: photourl }), // Fix Here
            });
    
            if (response.status === 200) {
                alert("Category added successfully");
                window.location.href="/viewcategory";
                setcategoryTitle("");
                setPhoto(""); // Fix Here
                 // Fix Here
            }
        } catch (error) {
            console.error("Error submitting category:", error);
            alert("Failed to submit category");
        }
    };
    
  return (
    <div className="blog-container container mt-5 mb-4">
    <div className="row justify-content-center m-4">
      {/* Blog Form */}
      <div className="col-lg-6 mt-5">
        <div className="card px-4 py-3 shadow-sm">
          <h2 className="text-center mb-3">Update Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter category title"
                value={categorytitle}
                onChange={(e) => setcategoryTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
            {photourl && (
              <div className='mb-3 text-center'>
                <img src={photourl} alt="uploaded" width="150" className='rounded'/>
              </div>
            )}

            {/* <div className="mb-3">
              <label className="form-label">Category Content</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Write your Content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div> */}

            <button type="submit" className="btn btn-primary w-100">
              Update Categories
            </button>
          </form>
        </div>
      </div>

      {/* Blog Image */}
      <div className="col-lg-6 mt-3 d-flex flex-column align-items-center">
        <img
          src="https://elearningindustry.com/wp-content/uploads/2013/09/how-to-use-blogs-in-the-classroom.jpg"
          alt="Blog"
          className="blog-image img-fluid rounded shadow "
        />
        <img
          src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
          alt="Blog"
          className="blog-image img-fluid rounded shadow mt-4"
        />
      </div>
    </div>
  </div>
  )
}

export default UpdateCategory
