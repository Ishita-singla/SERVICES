import React, { useEffect, useState } from 'react'

const Categories = () => {
    const [categorytitle, setcategoryTitle] = useState("");
      const [photo, setPhoto] = useState("");
      const [photourl, setPhotourl] = useState("");
     

     
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
                 localStorage.setItem("photo", data.url);
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
     
      // const handleSubmit=async(e)=>{
      //    e.preventDefault();
      //    if (!categorytitle || !photourl) {
      //        alert("All fields are required");
      //        return;
      //      }
      //       alert("Submitting Blog..."); // Show alert before submission
      //      try {
            
      //            const response = await fetch("http://localhost:5000/api/insertcategory", {
      //              method: "POST",
      //              headers: { "Content-Type": "application/json" },
      //              body: JSON.stringify({ categoryname: categorytitle, categoryimage: photourl }),
      //            });
         
      //        if (response.status === 201) {
              
      //          alert("Category add successfully"); // Success message
      //          setcategoryTitle("");
      //          setPhoto("");
               
      //        }
      //      } catch (error) {
      //        console.error("Error submitting category:", error);
      //        alert("Failed to submit category");
      //      }
      //    };
        
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
            const response = await fetch("http://localhost:5001/api/insertcategory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryname: categorytitle, categoryimage: photourl }), // Fix Here
            });
    
            if (response.status === 201) {
                alert("Category added successfully");
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
          <h2 className="text-center mb-3">Add Category</h2>
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
              Add Categories
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

export default Categories
