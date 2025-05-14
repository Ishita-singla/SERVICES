


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewSmallSubCategory = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("http://localhost:5001/api/viewcategory")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(err => console.log("Error fetching categories:", err));
  }, []);

  // Delete subcategory
  const deleteSmallSubCategory = async (categoryid, subcategoryid,smallsubcategoryid) => {
    const formData = JSON.stringify({ categoryid, subcategoryid,smallsubcategoryid });

    try {
      const response = await fetch("http://localhost:5001/api/deletesmallsubcategory", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: formData,
      });

    //   if (response.ok) {
    //     alert("Sub-category deleted successfully!");
    //     setCategories(prevCategories =>
    //       prevCategories.map(category =>
    //         category._id === categoryid
    //           ? { 
    //               ...category, 
    //               subcategories: category.subcategories.filter(sub => sub._id !== subcategoryid) 
    //             }
    //           : category
    //       )
    //     );
    //   }
    if(response.ok){
        alert("blog deleted");
        // refresh krege taki blog delete ho jaye
        setTimeout(()=>{
          window.location.reload();
        },1000);
      }
       else {
        alert("Error deleting small-sub-category.");
      }
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">View Small Sub-Categories</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Small-Sub-Category</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category =>
              category.subcategories.map(subcategory =>
                subcategory.smallsubcategories.map(smallsubcategory=>(
                    <tr key={smallsubcategory._id}>
                  <td>{category.categoryname}</td>
                  <td>{subcategory.subcategoryname}</td>
                  <td>{smallsubcategory.smallsubcategoryname}</td>
                  
                  <td>
                    <img
                      src={smallsubcategory.smallsubcategoryimage}
                      alt={smallsubcategory.smallsubcategoryname}
                      className="img-fluid rounded"
                      style={{ height: "50px", width: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{smallsubcategory.smallsubcategorycontent}</td>
                  <td>{smallsubcategory.Price}</td>
                  
                <td>{smallsubcategory.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteSmallSubCategory(category._id, subcategory._id,smallsubcategory._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                  <td>
                                                    
                                                                  <Link to={`/admin/updatesmallsubcategory/${category._id}/${subcategory._id}/${smallsubcategory._id}`}>  <button
                                                                        className="btn  "
                                                                        
                                                                      >
                                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                                      </button></Link>  
                                                                    </td>
                </tr>

                 ) ) )
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-3">
        <Link to="/admin/addsmallsubcategories" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add More
        </Link>
      </div>
    </div>
  );
};

export default ViewSmallSubCategory;   
