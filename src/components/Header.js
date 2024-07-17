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
          <nav className="navbar bg-primary fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
              <img src='https://png.pngtree.com/png-vector/20221228/ourmid/pngtree-online-shopping-logo-desing-png-image_6540923.png' width={70} height={50} alt="Logo" />
              <Link to={'/Home'} className='btn'>Home</Link>
              <Link to={'/Electronics'} className='btn'>Electronics</Link>
              <Link to={'/Electronics'} className='btn'>Books</Link>
              <Link to={'/Electronics'} className='btn'>Jewelleries</Link>

              <form className="d-flex">
                {status === "logout" && (
                  <Link to='/Login' className='btn btn-primary'>Log in</Link>
                )}
                {status === "login" || status === "Admin" && (
                  <Link to='/Login' className='btn btn-primary'>{status}</Link>
                )}
              </form>
              <button className="btn btn-success" onClick={()=>handlOrders()}>
                 
                 Order History
               </button>
              <Link to='/Cart' className='btn btn-primary'><img
                      src="https://cdn-icons-png.flaticon.com/512/34/34568.png"
                      width={30}
                      height={30}
                       alt="My CART"
                    />{count}</Link>
            </div>
          </nav>
          <Outlet />
        </Usercontext.Provider>
      </>
    )
}
