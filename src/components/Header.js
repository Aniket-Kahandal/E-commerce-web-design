import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Usercontext } from '../Context/Context';
import axios from 'axios';

export default function Header() {
   const [status, setStatus] = useState("logout");
   const [count, setCount] = useState(0);
   const [loading, setLoading] = useState(false);
   const [cart, setCart] = useState([]);
   const [userId,setUserId]=useState("");
   const [username,setUsername]=useState("");
 const navigate=useNavigate();
   useEffect(() => {
      const fetchCartItems = async () => {
        setLoading(true);
        const response = await axios.get("http://localhost:8081/CartItems");
        console.log("Response", response);
        setCart(response.data);
        setLoading(false);
      };
      fetchCartItems();
    },[]);

  // ----This effect call when cart state changes------------
    useEffect(() => {
      setCount(cart.length);
    }, [cart]);

    // -------------This function add new item----------------------
    const addItemToCart = (item) => {
      
      setCart([...cart, item]); 
      
    };
    const removeItemFromCart = (itemId) => {
      setCart(cart.filter(item => item.id !== itemId));
    };  
    console.log("count", cart.length);
    const handlOrders=()=>{
      navigate('/orderhistory')
  }
    return (
      <>
      {/* Here i pass states as well as functions globally */}
        <Usercontext.Provider value={{ status, setStatus, count, setCount, addItemToCart,removeItemFromCart, userId,setUserId, username,setUsername }}>
          {/* <p>userID:{userId}</p> */}
        
<nav class="navbar navbar-dark bg-dark " >
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      
    </button>
    <div className="d-flex">
                {status === "logout" && (
                  <Link to='/Login' className='btn btn-primary mx-5'>Log in</Link>
                )}
                {status === "login" || status === "Admin" && (
                  <Link to='/Login' className='btn btn-primary mx-5'>{status}</Link>
                )}
                {status==="login" && (
                  <button className="btn btn-success" onClick={()=>handlOrders()}>
                 Order History
               </button>
                )}

                 <img className='btn btn' src='https://w7.pngwing.com/pngs/942/419/png-transparent-bookmark-favorite-love-save-like-essential-icon-thumbnail.png' width={50} height={50} onClick={()=>navigate('/recent')}></img>
              <Link to='/Cart' className='btn btn-primary mx-2'><img
                      src="https://cdn-icons-png.flaticon.com/512/34/34568.png"
                      width={30}
                      height={30}
                       alt="My CART"
                    />{count}</Link>
              </div>
              
  </div>
</nav>
<div class="collapse  " id="navbarToggleExternalContent" data-bs-theme="dark" style={{textAlignLast:"center"}}>
  <div class="bg-dark p-4">
  <Link to={'/Home'} className='btn'>Home</Link>
              <Link to={'/Electronics'} className='btn'>Electronics</Link>
              <Link to={'/Electronics'} className='btn'>Books</Link>
              <Link to={'/Electronics'} className='btn'>Jewelleries</Link>

  </div>
</div>
          <Outlet />
        </Usercontext.Provider>
      </>
    )
}
