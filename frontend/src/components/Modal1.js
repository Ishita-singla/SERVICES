import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./service.css"
import { useNavigate } from 'react-router-dom';


function Services() {
  const navigate=useNavigate();
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedsubCategory, setSelectedsubCategory] = useState();


  const handleClose = () => setShow(false);

  const handleShow = (category) => {
    setSelectedCategory(category);
    setShow(true);
  }

  useEffect(()=>{
    fetch("http://localhost:5000/api/categories")
    .then((response)=>response.json())
    .then((data)=>setCategories(data))
    .catch((error) => console.error("Error fetching categories:", error));

  },[])

  const handlesubcategory=(subs)=>{
setSelectedsubCategory(subs);
navigate(`/viewsmallsubcategory/${selectedCategory?.categoryname}/${subs.subcategoryname}`)

  }

  return (
  
 
    
<div className="services-container mt-5 p-4">
<div className=" categories-container  " >
{/* categories ek array hai jo API se aaya data store kar raha hai. Har category ek object hai.
map() function is array ke har ek element pe loop chalata hai aur uske liye ek div (category card) generate karta hai.
Jab user kisi category pe click karega, to handleShow(category) function call hoga. */}
  {categories.map((category)=>(
    <div  key={category._id} className="category-card " style={{backgroundColor:"#f5f5f5"}} onClick={() => handleShow(category)}>
            <img src={category.categoryimage} style={{ width: "50px", height: "50px", marginLeft: "10px", }}></img>

      <h6 className='text-bold'>{category.categoryname}</h6>
    </div>
  ))}
</div>

<Modal show={show} onHide={handleClose} centered>
{/* show={show}: Jab show state true hoga tab modal dikhega.
onHide={handleClose}: Jab user close karega to modal band hoga */}

<Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.categoryname}-</Modal.Title>
        </Modal.Header>
        {/* Yeh optional chaining (?.) ka use kar raha hai.
Agar selectedCategory exist karega, to selectedCategory.name return karega.
Agar selectedCategory null ya undefined ho, to error nahi aayega, sirf blank (undefined) return karega. */}

<Modal.Body>{selectedCategory&& selectedCategory.subcategories.length > 0 ?(
  // Check if subcategories exist: Agar selected category me subcategories hain tabhi unhe dikhana hai.
  
  <> 
  <ul className="list-group">
    {selectedCategory.subcategories.map((sub)=>(
      <li key={sub._id} className="list-group-item" onClick={() => handlesubcategory(sub)}>{sub.subcategoryname}
      <img src={sub.subcategoryimage} style={{ width: "50px", height: "50px", marginLeft: "10px" }}></img></li>

    ))}
  </ul>
  {/* Kuch categories ke liye extra sections diye gaye hain, jaise:
     "AC and Appliance Repair"
      "Electrician, Plumber and Carpenter"
       Agar selected category inme se koi hai, tabhi ye sections dikhai jaayengi */}


{/* {["AC & Appliance Repair", "Electrician, Plumber &Carpenter"].includes(selectedCategory.name) &&
  // Yeh check karta hai ki selected category ka naam in categories me hai ya nahi:

//"AC and Appliance Repair"
//"Electrician,Plumber and Carpenter"
// Agar selectedCategory.name in dono me se kisi ek ka match karega, tabhi aage ka code chalega.

selectedCategory.sections &&

//selectedCategory.sections
//👉 Yeh check karta hai ki selectedCategory ke andar sections exist karta hai ya nahi.
//📌 Agar sections exist karega, tabhi .map() chalega, warna kuch nahi hoga.

selectedCategory.sections.map((sub) => (
  <div key={sub.title}>
    <h2>{sub.title}</h2>
    <ul>
      {sub.items.map((subs) => (
        <li key={subs._id} className="list-group-item" onClick={()=>handlesubcategory(subs)}>
          {subs.name}
          <img src={subs.image} style={{ width: "50px", height: "50px", marginLeft: "10px" }} />
        </li>
      ))}
    </ul>
  </div>
))
} */}
</>
): (
  <p>No subcategories available.</p>
)}

  </Modal.Body>
  <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>

</div>


      
    
  );
}

export default Services;