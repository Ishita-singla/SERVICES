// import React, { useState } from 'react'

// const SubCategories = () => {
//     const [title, setTitle] = useState("");
//           const [photo, setPhoto] = useState("");
//           const [photourl, setPhotourl] = useState("");
//          const [content,setContent] = useState("");
//   return (
//     <div className="blog-container container mt-5 mb-4">
//     <div className="row justify-content-center m-4">
//       {/* Blog Form */}
//       <div className="col-lg-6">
//         <div className="card px-4 py-3 shadow-sm">
//           <h2 className="text-center mb-3">Add Sub-Category</h2>
//           <form >
//             <div className="mb-3">
//               <label className="form-label">Category Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter category title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Sub-Category Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter sub-category "
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Image </label>
//               <input
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Sub-Category Description</label>
//               <textarea
//                 className="form-control"
//                 rows="5"
//                 placeholder="Write your Content..."
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//               ></textarea>
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Add Sub-Categories
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Blog Image */}
//       <div className="col-lg-6 mt-3 d-flex flex-column align-items-center">
//         <img
//           src="https://elearningindustry.com/wp-content/uploads/2013/09/how-to-use-blogs-in-the-classroom.jpg"
//           alt="Blog"
//           className="blog-image img-fluid rounded shadow "
//         />
//         <img
//           src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
//           alt="Blog"
//           className="blog-image img-fluid rounded shadow mt-4"
//         />
//       </div>
//     </div>
//   </div>
//   )
// }

// export default SubCategories


// import React, { useEffect, useState } from 'react'

// const SubCategories = () => {
//     const [categorytitle, setcategoryTitle] = useState("");
//       const [photo, setPhoto] = useState("");
//       const [photourl, setPhotourl] = useState("");
//       const [content, setContent] = useState("");
     

     
//       useEffect(() => {
//         console.log("Selected Photo:", photo); // Debugging
//          if (photo) {
//            Upload(photo);
//          }
//        }, [photo]);
       
       
//        const Upload=async(photo)=>{
//          if(!photo){
//              alert("please select a photo")
//              return;
//          }
//          const data = new FormData();
//          data.append("file", photo);
//          data.append("upload_preset", "person");
//          data.append("cloud_name", "ddhm29flq");
//          fetch("https://api.cloudinary.com/v1_1/ddhm29flq/image/upload", {
//              method: "POST",
//              body: data,
//            })
//              .then((res) => res.json())
//              .then((data) => {
//                if (data.url) {
//                  setPhotourl(data.url);
//                  localStorage.setItem("photo", data.url);
//                  // alert("Photo uploaded successfully");
//                } else {
//                  alert("Failed to upload photo");
//                }
//              })
//              .catch((err) => {
//                console.error("Upload error:", err);
//                alert("Error uploading photo");
//              });
//          };
     
      
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("categorytitle:", categorytitle);
//     console.log("photourl:", photourl);
//         if (!categorytitle || !photourl) {
//             alert("All fields are required");
//             return;
//         }
//         alert("Submitting Category...");
//         try {
//             const response = await fetch("http://localhost:5001/api/insertcategory", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ categoryname: categorytitle, categoryimage: photourl }), // Fix Here
//             });
    
//             if (response.status === 201) {
//                 alert("Category added successfully");
//                 setcategoryTitle("");
//                 setPhoto(""); // Fix Here
//                  // Fix Here
//             }
//         } catch (error) {
//             console.error("Error submitting category:", error);
//             alert("Failed to submit category");
//         }
//     };
    
//   return (
//         <div className="blog-container container mt-5 mb-4">
//     <div className="row justify-content-center m-4">
//       {/* Blog Form */}
//       <div className="col-lg-6">
//         <div className="card px-4 py-3 shadow-sm">
//           <h2 className="text-center mb-3">Add Sub-Category</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Category Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter category title"
//                 value={categorytitle}
//                 onChange={(e) => setcategoryTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Sub-Category Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter sub-category "
//                 value={categorytitle}
//                 onChange={(e) => setcategoryTitle(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Image </label>
//               <input
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Sub-Category Description</label>
//               <textarea
//                 className="form-control"
//                 rows="5"
//                 placeholder="Write your Content..."
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//               ></textarea>
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Add Sub-Categories
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Blog Image */}
//       <div className="col-lg-6 mt-3 d-flex flex-column align-items-center">
//         <img
//           src="https://elearningindustry.com/wp-content/uploads/2013/09/how-to-use-blogs-in-the-classroom.jpg"
//           alt="Blog"
//           className="blog-image img-fluid rounded shadow "
//         />
//         <img
//           src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
//           alt="Blog"
//           className="blog-image img-fluid rounded shadow mt-4"
//         />
//       </div>
//     </div>
//   </div>


//   )
// }

// export default SubCategories

import React, { useEffect, useState } from 'react';

const SubCategories = () => {
  const [categories, setCategories] = useState([]); // State for storing categories
  const [categorytitle, setCategoryTitle] = useState(""); // Selected category
  const [subcategorytitle, setSubcategoryTitle] = useState(""); // Subcategory name
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [content, setContent] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/categories");
      const data = await response.json();
      setCategories(data); // Store categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    console.log("Selected Photo:", photo);
    if (photo) {
      Upload(photo);
    }
  }, [photo]);

  const Upload = async (photo) => {
    if (!photo) {
      alert("Please select a photo");
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
    console.log("subcategorytitle:", subcategorytitle);
    console.log("photourl:", photourl);

    if (!categorytitle || !subcategorytitle || !photourl || !content) {
      alert("All fields are required");
      return;
    }
    alert("Submitting Sub-Category...");
    try {
      const response = await fetch("http://localhost:5001/api/insertsubcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          categoryname: categorytitle, // ✅ Ab categoryname sahi pass ho raha hai
          subcategoryname: subcategorytitle, 
          subcategoryimage: photourl, 
          content: content
        }),
      });
      

      if (response.status === 201) {
        alert("Sub-Category added successfully");
        setCategoryTitle("");
        setSubcategoryTitle("");
        setPhoto("");
        setPhotourl("");
        setContent("");
      }
    } catch (error) {
      console.error("Error submitting sub-category:", error);
      alert("Failed to submit sub-category");
    }
  };

  return (
    <div className="container mt-5 mb-4">
      <div className="row justify-content-center m-4">
        <div className="col-lg-6">
          <div className="card px-4 py-3 shadow-sm">
            <h2 className="text-center mb-3">Add Sub-Category</h2>
            <form onSubmit={handleSubmit}>
              
              {/* Dropdown for selecting category */}
              <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select 
                  className="form-control" 
                  value={categorytitle} 
                  onChange={(e) => setCategoryTitle(e.target.value)}
                  required
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.categoryname}> 
                    {cat.categoryname}
                  </option>
                  
                  ))}
                </select>
              </div>

              {/* Subcategory Name */}
              <div className="mb-3">
                <label className="form-label">Sub-Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter sub-category"
                  value={subcategorytitle}
                  onChange={(e) => setSubcategoryTitle(e.target.value)}
                  required
                />
              </div>

              {/* Upload Image */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

              {/* Subcategory Description */}
              <div className="mb-3">
                <label className="form-label">Sub-Category Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your description..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Sub-Category
              </button>
            </form>
          </div>
        </div>

        {/* Blog Images */}
        <div className="col-lg-6 mt-3 d-flex flex-column align-items-center">
          <img
            src="https://elearningindustry.com/wp-content/uploads/2013/09/how-to-use-blogs-in-the-classroom.jpg"
            alt="Blog"
            className="img-fluid rounded shadow"
          />
          <img
            src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
            alt="Blog"
            className="img-fluid rounded shadow mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategories;

