import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./cart.css";
import { Usercontext } from "../Context/Context";
import OrderHistory from "./OrderHistory";

export default function AddToCart() {
  const [cart, setCart] = useState([]);
  const { count, removeItemFromCart, status ,userId} = useContext(Usercontext);
  let [bil, setBill] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getcart();
    // calBill();
  }, []);
  console.log("Count", count,"UserID ",userId);
  const getcart = () => {
    fetch("http://localhost:8081/CartItems")
      .then((Response) => Response.json())
      .then((result) => {
        setCart(result);
        // calBill();
      });
  };

  const increase = (item) => {
    fetch("http://localhost:8081/CartItems/" + item.id, {
      method: "PUT",
      body: JSON.stringify({
        id: item.id,
        product_id: item.product_id,
        name: item.name,
        color: item.color,
        model: item.model,

        quantity: item.quantity + 1,
        price: item.price,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((Response) => Response.json())
      .then((result) => {
        getcart();
        setBill(item.quantity * item.price);
      });
  };
  const reduce = (item) => {
    //alert(item.quantity===0)

    if (item.quantity - 1 > 0) {
      fetch("http://localhost:8081/CartItems/" + item.id, {
        method: "PUT",
        body: JSON.stringify({
          id: item.id,
          product_id: item.product_id,
          userId:userId,
          name: item.name,

          model: item.model,
          color: item.color,
          quantity: item.quantity - 1,
          price: item.price,
        }),
        headers: { "Content-type": "application/json" },
      })
        .then((Response) => Response.json())
        .then((result) => {
          getcart();
          setBill(item.quantity * item.price);
        });
    }
    if (item.quantity - 1 === 0) {
      fetch("http://localhost:8081/CartItems/" + item.id, {
        method: "DELETE",
      })
        .then((Response) => Response.json())
        .then((result) => {
          getcart();
          // addItemToCart(result);

          alert("item deleted");
          removeItemFromCart(item.id);
        });
    }
  };
  //  console.log("CART ITEMS",cart.length)
  useEffect(() => {}, [count]);
  const Delete = (item) => {
    fetch("http://localhost:8081/CartItems/" + item.id, {
      method: "DELETE",
    })
      .then((Response) => Response.json())
      .then((result) => {
        getcart();
        // addItemToCart(result);
        removeItemFromCart(item.id);
        alert("item deleted");
      });
  };
  const HandleBuynow = () => {
    if (cart.length === 0) {
      navigate("/electronics");
    } else if (status === "logout") {
      navigate("/login");
    } else {
      navigate("/buy", { state: { bil } });
      console.log("Bill", bil);
    }
  };

  useEffect(() => {
    let cartSum = 0;
    cart.map((item) => {
      cartSum = cartSum + item.quantity * item.price;
      setBill(cartSum);
    });
  }, [cart]);
  console.log("Bill", bil);
  return (
    <>
      <div className="container1 ">
        {count == 0 && (
          <div>
            <h4>Cart is empty</h4>
          </div>
        )}
        {count > 0 ? (
          <div>
            <h3 style={{ textAlign: "center" }}>My Cart</h3>

            <div className=" container">
              <div className="table-responsive">
                <table class="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">product_id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quanity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Payable Amount</th>
                      

                    </tr>
                  </thead>
                  {cart.map((item)=>{
                    return(
                      
                      <tr className="text-center   ">
                       <th scope="row">{item.id}</th>
                       <td> {item.product_id}</td>
                       <td> {item.name}</td>
                       <td>
                        <button className="btn btn-success" onClick={()=>increase(item)}>
                          +
                        </button>
                        <label>{item.quantity}</label>
                        <button className="btn btn-success" onClick={()=>reduce(item)}>
                          -
                        </button>
                       </td>
                       <td> {item.price}</td>
                       <td> {item.price* item.quantity}</td>

                       </tr>
                    
                    )
                  })}
                  <tbody>
                   
                    <tr>
                      <th scope="row"></th>
                      <td colspan="4" style={{textAlign:"end"}}>< strong>Total Amount</strong></td>
                      <td style={{textAlign:"center"}}><strong>{bil}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div style={{ textAlignLast: "center", paddingLeft: "475px" }}>
                <strong>Total Amount : {bil}</strong>
              </div> */}
              <div className="text-center">
                <button
                  className="btn btn-primary  mt-3 "
                  onClick={HandleBuynow}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="text-center shadow p-3 mb-5 bg-white rounded"
            style={{ margin: "100px" }}
          >
            <h3 style={{ textAlign: "center" }}>cart is empty</h3>
            <span style={{ fontSize: "28px" }}>&#128073;</span>
            <button
              className="btn btn-success mx-3"
              onClick={() => HandleBuynow()}
            >
              Shop Again
            </button>
            <span style={{ fontSize: "28px" }}>&#128072;</span>

            <body></body>
          </div>
        )}
      </div>
    </>
  );
}
