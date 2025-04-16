import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UpdateBlogs = () => {
   
    const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
 const [content,setContent] = useState("");
 const [items,setitems]=useState({});

 let {id}=useParams();
 


 useEffect(()=>{
    const formData = JSON.stringify({
        id:id
    });
         fetch(`http://localhost:5000/api/blogdetail`,{
            headers:{
                "Content-type":"application/json"
            },
            method: "POST",
            body: formData,
          })
         .then(response=>response.json())
         // .then(data=>console.log(data))
         .then(data=>setitems(data))
         .catch(err=>console.log(err))
     },[id]);

 useEffect(()=>{
    console.log("Items received:", items); // Debugging
    if(items && typeof items === "object"){
        setTitle(items.title);
setPhotourl(items.photo);
setContent(items.content);
    }


 },[items])
// useEffect(() => {
//     console.log("Items received:", items); // Debugging
    
//     if (Array.isArray(items)) {
//         console.log("Items is an array:", items);
//     } else {
//         console.log("Items is an object:", items);
//     }

//     if (items && items.length > 0) {
//         setTitle(items[0].title);
//         setPhotourl(items[0].photo);
//         setContent(items[0].content);
//     } else if (items && typeof items === "object") {
//         setTitle(items.title);
//         setPhotourl(items.photo);
//         setContent(items.content);
//     }
// }, [items]);


 useEffect(() => {
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

 const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!title || !content || !photourl) {
        alert("All fields are required");
        return;
      }
       alert("Submitting Blog..."); // Show alert before submission
      try {
       
            const response = await fetch("http://localhost:5000/api/updateblog", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({id, title, content, photo: photourl }),
            });
    
        if (response.status === 200) {
         
          alert("Blog posted successfully"); // Success message
          window.location.href="/viewBlogs";
          setTitle("");
          setPhoto("");
          setContent("");
        }
      } catch (error) {
        console.error("Error submitting blog:", error);
        alert("Failed to submit blog");
      }
    };
   
 
 

  
  return (
    <div className="blog-container container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        {/* Blog Form */}
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Upload Blog </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Blog Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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

              <div className="mb-3">
                <label className="form-label">Blog Content</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your blog..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Update Blog
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

export default UpdateBlogs
