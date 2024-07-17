import React, { useEffect, useState } from "react";
import InsertItem from "./InsertItem";
import { useNavigate } from "react-router-dom";

export default function Add(props) {
  const [list, setList] = useState([]);
// console.log(props,"props")    
  const [id, setId] = useState("");
  const [img, setImg] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [btn, setBtn] = useState("submit");

  const navigate = useNavigate();
  useEffect(() => {
    getData();
    // {setcount(count+=1)}
  }, []);
  const getData = () =>
    fetch("http://localhost:8080/Mobiles")
      .then((response) => response.json())
      .then((result) => setList(result));
      const findMaxId = () => {
        if (list.length === 0) return 0;
        return Math.max(...list.map(item => parseInt(item.id, 10)));
      }
      
      
  const submit = (element) => {
    element.preventDefault();
    const maxId = findMaxId();
    console.log(maxId,"MaxId")
    if (btn === "submit") {
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
            props.setPopupOpen(false)
          alert("New Gadget Added");
          getData();
          navigate("/insert");
        });
    }
    
  };
  return (
    <>
      <form onSubmit={submit}>
        <div className="border border-dark m-5 p-5">
          <h4>Add new details</h4>
          <div className="row  mt-5">
            {/* <div className="col">
            <input type="text" className="form-control" placeholder="id"
             aria-label="brand name" value={id} readOnly/>
          </div> */}
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Brand"
                aria-label="brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Model name"
                aria-label="model name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mt-5">
            <div class="btn-group dropend">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{width:"50px"}}
              >
                color
              </button>
              <ul class="dropdown-menu">
                <input className="btn btn-secondary" value={"red"} onClick={() => setColor("red")} readOnly>
                  
                </input><br></br>
                <input className="btn btn-secondary mt-2" value={"black"} onClick={() => setColor("black")}readOnly>
                  
                </input><br></br>
                <input className="btn btn-secondary mt-2" value={"silver"} onClick={() => setColor("silver")} readOnly>
                  
                </input><br></br>
              </ul>
            </div>
            <div className="col mt-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                aria-label="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div class="input-group mt-5">
            {/* <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" value={img} onChange={(e)=>setImg(e.target.value)} required/> */}
            <input
              type="text"
              className="form-control"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            {/* <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button> */}
          </div>
          <button type="submit" className="btn btn-primary mt-5 mx-2" onClick={()=>props.setPopupOpen(true)}>
            
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
