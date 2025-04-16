import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

const UpdateSmallSubCategory = () => {
    const [categorytitle,setcategoryTitle]=useState("");
    const [subcategorytitle, setsubcategoryTitle] = useState("");
    const [smallsubcategorytitle, setsmallsubcategoryTitle] = useState("");
    const [Price, setPrice] = useState("");


    const [smallsubcategorycontent, setsmallsubcategorycontent] = useState("");

      const [photo, setPhoto] = useState("");
      const [photourl, setPhotourl] = useState("");
      const [items,setitems]=useState({});
      let {categoryid,subcategoryid,smallsubcategoryid}=useParams();

      
          
  useEffect(()=>{
    // 1️⃣ Ek object bana rahe hain jo backend ko bhejna hai
      const formData = JSON.stringify({
          Categoryid:categoryid,//front vali backend vali last vali frontend vali
          Subcategoryid:subcategoryid,
          SmallSubcategoryid:smallsubcategoryid


      });
           fetch(`http://localhost:5000/api/smallsubcategory`,{
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
       },[smallsubcategoryid]);
  
    
    useEffect(() => {
  if (items && Object.keys(items).length > 0) { // ✅ Ensure items is not empty
    console.log("Setting State with Data:", items);
    setcategoryTitle(items.categoryname ||"");
    setsubcategoryTitle(items.subcategoryname ||"");

    setsmallsubcategoryTitle(items.smallsubcategoryname || "");  // ✅ Ensure no undefined values
    setPhotourl(items.smallsubcategoryimage || "");// jhan or name and image odel vali deni hai
    setsmallsubcategorycontent(items.smallsubcategorycontent|| "");// jhan or name and image odel vali deni hai
    setPrice(items.Price || "")


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
        console.log("subcategorytitle:", subcategorytitle);
        console.log("smallsubcategorytitile",smallsubcategorytitle)
        console.log("Price",Price)

        console.log("smallsubcontent",smallsubcategorycontent)

    console.log("photourl:", photourl);
        if ( !smallsubcategorycontent ||!smallsubcategorytitle || !Price) {
            alert("All fields are required");
            return;
        }
        alert("Submitting sub-Category...");
        try {
            const response = await fetch("http://localhost:5000/api/updatesmallsubcategory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryid,subcategoryid,smallsubcategoryid,smallsubcategoryname: smallsubcategorytitle, smallsubcategoryimage: photourl ,smallsubcategorycontent:smallsubcategorycontent,Price : Price}), // Fix Here
                
            });
    
            if (response.status === 200) {
                alert("Category added successfully");
                window.location.href="/viewsmallsubcategory";
                setsmallsubcategoryTitle("");
                setPhoto(""); // Fix Here
                setPrice("")
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
          <h2 className="text-center mb-3">Update Small-sub Category</h2>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label className="form-label">small-sub-Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter category title"
                value={smallsubcategorytitle}
                onChange={(e) => setsmallsubcategoryTitle(e.target.value)}
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

            <div className="mb-3">
              <label className="form-label">Content </label>
              <input
                type="text"
                className="form-control"
                value={smallsubcategorycontent}
                onChange={(e) => setsmallsubcategorycontent(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price </label>
              <input
                type="text"
                className="form-control"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Small-Sub-Categories
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

export default UpdateSmallSubCategory
