import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inser.css";

export default function InsertItem() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  let [id, setId] = useState("");
  let [img, setImg] = useState("");
  let [brand, setBrand] = useState("");
  let [model, setModel] = useState("");
  let [color, setColor] = useState("");
  let [price, setPrice] = useState("");
  let [btn, setBtn] = useState("submit");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  let [showViewModal,setViewModal]=useState(false)
  const [popupOpen, setPopupOpen] = useState(false);

  // -----------Error variables---------
  const[brandError,SetBrandError]=useState("");
  const[modelError,SetModelError]=useState("");
  const[colorError,SetColorError]=useState("");
  const[priceError,SetPriceError]=useState("");
  
  // const[error,setError]=useState({
  //     brandError:"",
  //     modelError:"",
  //     colorError:"",
  //     priceError:"",
  //    });
 
 

  useEffect(() => {
    getData();
    
  }, []);

  useEffect(() => {
    if (showAddModal || showEditModal || showViewModal) {
      // document.body.classList.add("low-opacity");
      // document.getElementsByClassName("table").add("low-opacity")
    } 
    else {
      document.body.classList.remove("low-opacity");

    }
    // ValidForm();
    
  }, [showAddModal, showEditModal, showViewModal, ]);
  const getData = () =>
    fetch("http://localhost:8080/Mobiles")
      .then((response) => response.json())
      .then((result) => setList(result));
  // console.log("Getdata",getData)
  const findMaxId = () => {
    if (list.length === 0) return 0;
    return Math.max(...list.map((item) => parseInt(item.id, item.length)));
  };

  const submit = (element) => {
    element.preventDefault();
    const isValid=ValidForm();
    console.log(isValid,"Error in submit func");
    // setError(errMassage);
    if (! isValid)return;
    if (btn === "submit" ) {
      const maxId = findMaxId();
      fetch("http://localhost:8080/Mobiles", {
        method: "POST",
        body: JSON.stringify({
          id: "" + (maxId + 1),
          name: brand,
          image: img,
          color: color,
          model: model,
          price: price,
        }),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((result) => {
          alert("New Gadget Added");
          getData();
          clear();
          setShowAddModal(false); // Close the add modal
          setPopupOpen(false);
        });
    } 
    else {
      fetch("http://localhost:8080/Mobiles/" + id, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          name: brand,
          image: img,
          model: model,
          color: color,
          price: price,
        }),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((result) => {
          alert("Record Updated");
          clear();
          getData();
          setBtn("submit");
          setShowEditModal(false); // Close the edit modal
         
        });
    }
  };
// ------Validaition checks---------
 const ValidForm=()=>{
    let isValid=true;
     if(!brand.trim())
     {
        SetBrandError("Mandatory");
        isValid=false;
     }
     else { SetBrandError("");}
     if(!model.trim())
      {
         SetModelError("Model name is Mandatory !");
         isValid=false;
      }
      else { SetModelError("");}
      if(!color.trim())
        {
           SetColorError("Mandatory");
           isValid=false;
        }
        else { SetColorError("");}
        if(!price.trim())
          {
             SetPriceError("Mandatory");
             isValid=false;
          }
          else if(isNaN(price) || Number(price)<=0){SetPriceError("Invalid Price")}
          else { SetPriceError("");}
    return isValid;
 }
    console.log(brandError,"Error of brand");



  const edit = (item) => {
    // debugger
    setId(item.id);
    setBrand(item.name);
    setModel(item.model);
    setColor(item.color);
    setPrice(item.price);
    setImg(item.image);
    setBtn("edit");
    setShowEditModal(true);
  };

  const Delete = (item) => {
    fetch("http://localhost:8080/Mobiles/" + item.id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Record deleted");
        getData();
      });
  };
 
  const Show=(item)=>{
    setId(item.id);
    setBrand(item.name);
    setModel(item.model);
    setColor(item.color);
    setPrice(item.price);
    setImg(item.image);
    setViewModal(true)
    
  }
  console.log("color",color)
  const clear=()=>{
    // debugger
      setBrand("");
      setModel(""); 
      setColor("");
      setPrice("");
      setImg("");
      SetBrandError("");
      SetModelError("");
      SetColorError("");
      SetPriceError("");
      setShowAddModal(false);
      setShowEditModal(false);
      setViewModal(false);
     }
  return (
    <>
       

        {showAddModal && (
          <div
            className="modal fade show"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Add new Item
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => clear()}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={submit}>
                    <div className="mb-3">
                      <label htmlFor="brand" className="form-label">
                       <strong> Brand Name </strong>
                        
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        
                      />
                      <span style={{color:"red"}}>{brandError}</span>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="model" className="form-label">
                        <strong>Model name </strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required 
                      />
                      <span style={{color:"red"}}>{modelError}</span>

                    </div>
                    <div className="mb-3">
                    <label htmlFor="color" className="form-label">
                       <strong>color</strong>
                      </label>
                      <select
                        name="color"
                        id="color"
                        className="form-control"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                      >
                        <option value="">Choose Color</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="silver">Silver</option>
                      </select>
                      <span style={{color:"red"}}>{colorError}</span>

                    </div>
                    <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                       <strong>Price</strong>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <span style={{color:"red"}}>{priceError}</span>

                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                       <strong>image URL</strong>
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="image"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => clear()}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submit}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && (
          <div
            className="modal fade show"
            id="staticBackdrop1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Edit Item
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => clear()}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={submit}>
                    <div className="mb-3">
                      <label htmlFor="brand" className="form-label">
                      <strong>Brand name </strong>
                        
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                      />
                      <span style={{color:"red"}}>{brandError}</span>
                      
                    </div>
                    <div className="mb-3">
                      <label htmlFor="model" className="form-label">
                       <strong>Model name </strong>
                        
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                      />
                      <span style={{color:"red"}}>{modelError}</span>

                    </div>
                    <div className="mb-3">
                    <label htmlFor="color" className="form-label">
                    <strong> Color</strong>

                      </label>
                      <select
                        name="color"
                        id="color"
                        className="form-control"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                      >
                        <option value="">Choose Color</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="silver">Silver</option>
                      </select>
                      <span style={{color:"red"}}>{colorError}</span>

                    </div>
                    <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                    <strong>Price</strong>

                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <span style={{color:"red"}}>{priceError}</span>

                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                       <strong>Image URL</strong> 
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="image"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => clear()}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
         {showViewModal && (
          <div
            className="modal fade show"
            id="staticBackdrop1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Item Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => clear()}
                  ></button>
                </div>
                <div className="modal-body">
                  <form >
                  <div className="mb-3">
                     <img src={img} width={70} height={70} style={{alignSelf:"center"}}></img>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="brand" className="form-label">
                       <strong> Brand Name </strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        value={brand}
                         />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="model" className="form-label">
                      <strong>Model name </strong>

                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="model"
                        value={model}
                        
                      />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="color" className="form-label">
                       <strong> Color</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="model"
                        value={color}
                        
                      />
                        {/* <option value="">Choose Color</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="silver">Silver</option> */}
                      {/* </select> */}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        
                      />
                    </div>
                    
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => clear()}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={`ordersummary ${showAddModal || showEditModal ? 'low-opacity':'regular'}`}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
          
        >
          Add new
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Name</th>
              <th scope="col">Color</th>
              <th scope="col">Price</th>
              <th scope="col">Availability</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          {list.map((item) => {
            return (
              <tbody key={item.id}>
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.color}</td>
                  <td>{item.price}</td>
                  <td>
                    <input type="checkbox" defaultChecked></input>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => edit(item)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <img
                      src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-button-5849885-4901535.png"
                      width={50}
                      height={50}
                      className="btn"
                      onClick={() => Delete(item)}
                      alt="delete"
                    />
                  </td>
                  <td>
                  <img
                      src="https://www.shutterstock.com/image-vector/view-button-icon-260nw-685731997.jpg"
                      width={70}
                      height={70}
                      className="btn" 
                      onClick={() => Show(item)}
                      alt="delete"
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}
