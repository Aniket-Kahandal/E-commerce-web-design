import React, { useContext } from 'react'
import { useState , useEffect} from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Usercontext } from '../Context/Context';

export default function Edit() {
  const [status,setStatus]=useContext(Usercontext)
    const location =useLocation();
    const navigate=useNavigate();
    const data=location.state;
    console.log(data,"list before edit")
    
    const [list, setList] = useState([]);
  const[id,setId]=useState(data?.item?.id);
  const [img, setImg] = useState(data?.item?.image);
  const [brand, setBrand] = useState(data?.item?.name);
  const [model, setModel] = useState(data?.item?.model);
  const [color, setColor] = useState(data?.item?.color);
  const [price, setPrice] = useState(data?.item?.price);
  const [btn, setBtn] = useState("submit")
  console.log("Login status",status)
   console.log("id",id)
  useEffect(() => {
    getData();
  },[])
  const getData = () => fetch("http://localhost:8080/Mobiles").then((response) => response.json()).then((result) => setList(result))
   
  const submit=()=>{
      fetch("http://localhost:8080/Mobiles/"+id,{
          method:"PUT",
          body:JSON.stringify({
             id:id,
             name:brand,
             image:img,
             model:model,
             price:price,
             color:color
          }),headers:{"Content-type":'application/json'},
        }).then((response)=>response.json()).then((result)=>{
             alert("Record Updated");
             getData();
            })
            navigate('/Electronics');
          }
          
   console.log("list after edit",data)
  return (
    <>
       <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {/* <p>Modal body text goes here.</p> */}
        <form  onSubmit={submit}>
      <div className='border border-dark m-5 p-5'>
        <h4>Edit details</h4>
        <div className="row  mt-5">
        <div className="col">
            <input type="text" className="form-control" placeholder="id"
             aria-label="brand name" value={id} readOnly/>
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Enter Brand"
             aria-label="brand name" value={brand} onChange={(e)=>setBrand(e.target.value)} required/>
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Enter Model name" 
            aria-label="model name" value={model} onChange={(e)=>setModel(e.target.value)} required/>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <input type="text" className="form-control" placeholder="Color" 
            aria-label="Color" value={color} onChange={(e)=>setColor(e.target.value)} required/>
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Price" 
            aria-label="price" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
          </div>
        </div>
        <div class="input-group mt-5" >
          {/* <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" value={img} onChange={(e)=>setImg(e.target.value)} required/> */}
          <input type='text' className="form-control" value={img} onChange={(e)=>setImg(e.target.value)}/>
            {/* <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button> */}
        </div>
        <button type='submit' className='btn btn-primary mt-5 ' id="inputGroupFileAddon04" > Submit</button>
        <button className="btn btn-primary mt-5 mx-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" 
        aria-controls="offcanvasRight">Show All record</button>
         <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasTopLabel">
            Mobile List
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {list.map((item) => {
            console.log(item.img, "item.img");
            return (
              <table>
                <img src={item.image
                  
                } width={100} height={100}></img>
                <tr>{item.name}</tr>
                <tr>{item.model}</tr>
                <tr>{item.color}</tr>
                <tr>{item.price}</tr>
                {/* <hr></hr> */}
                
                <hr></hr>
              </table>
            );
          })}
        </div>
      </div>


      </div>
      
      </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
