import React, { useEffect, useState, useContext } from "react";
import InsertItem from "./InsertItem";
import { json, useNavigate } from "react-router-dom";
import "./Electronics.css";
import { Usercontext } from "../Context/Context";
import BuyItem from "./BuyItem";
import AddToCart from "./AddToCart";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import RecentaView from "./RecentaView";

export default function Electronics() {
  //#region Decaltaion
  // ------Decalation of variables --------------------------
  const [mobileList, setMobileList] = useState([]);
  const [cart, setCart] = useState([]);
  const [laptopList, setLaptopList] = useState([]);
  const [favItem, setFavItem] = useState([]);
  const [recent, setRecent] = useState([]);
  const { status, setStatus,userId, username } = useContext(Usercontext);
  const { addItemToCart, removeItemFromCart } = useContext(Usercontext);
  const [quantity, setQuantity] = useState();
  const [fav, setFav] = useState(false);
  // const [quantity,setquant]=useState(0);
  const [view, setView] = useState(false);
  let [id, setId] = useState("");
  let [img, setImg] = useState("");
  let [brand, setBrand] = useState("");
  let [model, setModel] = useState("");
  let [color, setColor] = useState("");
  let [price, setPrice] = useState("");
  //#endregion
  console.log("Login status", status ,"userId",userId ,"username",username);
  const navigate = useNavigate();
  useEffect(() => {
    getMobile();
    getLaptop();
    getRecentView();
    getFav();
    getCart();
  }, []);

  const getRecentView = () => {
    fetch("http://localhost:8083/recent_View")
      .then((response) => response.json())
      .then((result) => setRecent(result));
  };
  console.log("Length of recent", recent.length);
  // ----Get Favourite items from json-----------
  const getFav = () => {
    fetch("http://localhost:8082/item")
      .then((response) => response.json())
      .then((result) => setFavItem(result));
  };
  console.log("favitem", favItem);

  // ----Get Cart items from json-----------
  const getCart = () => {
    fetch("http://localhost:8081/CartItems")
      .then((Response) => Response.json())
      .then((result) => setCart(result));
  };
  // ----Get Mobile items from json-----------
  const getMobile = async () => {
    await fetch("http://localhost:8080/Mobiles")
      .then((Response) => Response.json())
      .then((result) => {
        console.log(result, "result");
        setMobileList(result);
      });
  };
  // console.log(mobileList,"list");
  // console.log(mobileList,"mobileList")

  const getLaptop = () => {
    fetch("http://localhost:8080/Laptops")
      .then((Response) => Response.json())
      .then((result) => setLaptopList(result));
  };
  // console.log(laptopList,"Laptop");

  //   ---------Add new gadget--------
  const additem = () => {
    navigate("/insert", { state: { mobileList } });
  };
  //  ---------------------Increase Quantity------
  const increse = (item) => {
    mobileList.map((mobdata) => {
      if (mobdata.id === item.product_id) {
        fetch("http://localhost:8081/CartItems/" + item.id, {
          method: "PUT",
          body: JSON.stringify({
            id: item.id,
            product_id: item.id,
            image: item.image,

            name: item.model,
            price: item.price,
            quantity: (item.quantity += 1),
          }),
          Headers: { "Content-type": "application/json" },
        })
          .then((Response) => Response.json())
          .then((result) => {
            alert("Quantity updated");
            getCart();
            console.log("Quanity", item.quantity);
          });
      }
    });
  };

  // ----Function for Buy---------
  const AddItem = (item) => {
    if (status === "login") {
      navigate("/buy", { state: { item } });
    } else {
      navigate("/Login");
    }
  };

  //-----Copy product details into Cart json--------------
  const copyProduct = (item) => {
    //#region
    // debugger
    // const isItemAvailable=cart.filter(element=>element.product_id === item.id );
    // console.log("Item",isItemAvailable)
    // if(isItemAvailable != null){
    //   fetch("http://localhost:8081/CartItems/" +item.id, {
    //           method: "PUT",
    //           body: JSON.stringify({
    //             id: item.id,
    //             product_id: item.id,
    //             name: item.name,
    //             quantity:(item.quantity + 1),
    //             price: item.price,
    //           }),
    //           headers: { "Content-type": "application/json" },
    //         })
    //           .then((Response) => Response.json())
    //           .then((result) => {
    //             getCart();
    //             alert("Cart updated");
    //           });
    // }else{
    //   fetch("http://localhost:8081/CartItems",{
    //           method:"POST",
    //           body:JSON.stringify({
    //              id:""+(cart.length +1),
    //              product_id:item.id,
    //              name:item.name,
    //              quantity:1,
    //              price:item.price
    //           }),headers:{"Content-type" : "application/json"},
    //      }).then((Response)=>Response.json()).then((result)=>{
    //         getCart();
    //         alert("new item added to cart")
    //      })

    // }
    //#endregion
    const updatecart = cart
      .filter((e) => e.product_id == item.id)
      .map((element) => {
        fetch("http://localhost:8081/CartItems/" + element.id, {
          method: "PUT",
          body: JSON.stringify({
            id: element.id,
            product_id: element.product_id,
            name: element.name,
            color: element.color,
            image: element.image,
            quantity: element.quantity + 1,
            price: element.price,
          }),
          headers: { "Content-type": "application/json" },
        })
          .then((Response) => Response.json())
          .then((result) => {
            getCart();
            alert("Cart updated");
            // navigate('/cart ');
          });
      });
    // console.log(updatecart,"updatecatr")
    if (updatecart.length == 0) {
      fetch("http://localhost:8081/CartItems", {
        method: "POST",
        body: JSON.stringify({
          id: "" + (cart.length + 1),
          product_id: item.id,
          name: item.name,
          color: item.color,
          image: item.image,
          quantity: 1,
          price: item.price,
        }),
        headers: { "Content-type": "application/json" },
      })
        .then((Response) => Response.json())
        .then((result) => {
          getCart();
          alert("new item added to cart");
          addItemToCart(result);

          // navigate('/cart ');
        });
    }
  };
  const increase = (item) => {
    fetch("http://localhost:8081/CartItems/" + item.id, {
      method: "PUT",
      body: JSON.stringify({
        id: item.id,
        product_id: item.product_id,
        name: item.name,
        color: item.color,
        quantity: item.quantity + 1,
        price: item.price,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((Response) => Response.json())
      .then((result) => {
        getCart();
      });
  };
  const decrease = (item) => {
    if (item.quantity > 0) {
      fetch("http://localhost:8081/CartItems/" + item.id, {
        method: "PUT",
        body: JSON.stringify({
          id: item.id,
          product_id: item.product_id,
          name: item.name,
          color: item.color,
          quantity: item.quantity - 1,
          price: item.price,
        }),
        headers: { "Content-type": "application/json" },
      })
        .then((Response) => Response.json())
        .then((result) => {
          getCart();
        });
    }
    if (item.quantity - 1 === 0) {
      fetch("http://localhost:8081/CartItems/" + item.id, {
        method: "DELETE",
      })
        .then((Response) => Response.json())
        .then((result) => {
          getCart();
          // addItemToCart(result);

          // alert("item deleted");
          removeItemFromCart(item.id);
        });
    }
  };
  const AddFav = (item) => {
    const updateFav = favItem.find((element) => element.pId === item.id);
    console.log("Updated fav", updateFav);
    if (!updateFav) {
      fetch("http://localhost:8082/item", {
        method: "POST",
        body: JSON.stringify({
          id: "" + (favItem.length + 1),
          pId: item.id,
          Name: item.name,
          status: "fav",
          image: item.image,
        }),
        headers: { "content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((result) => {
          getFav();
          setFav(true);
          alert("Item added to favourite");
        });
    } else {
      fetch("http://localhost:8082/item/" + updateFav.id, {
        method: "DELETE",
      })
        .then((Response) => Response.json())
        .then((result) => {
          getFav();
          alert("item deleted from favourite");
        });
    }
  };
  const updateRecent = (item) => {

    const isValid=recent.some((element)=>element.pId==item.id);
    console.log('Isvalid',isValid)
    if(! isValid)
    {
    fetch("http://localhost:8083/recent_View", {
      method: "POST",
      body: JSON.stringify({
        id: "" + (recent.length + 1),
        pId: "" + item.id,
        Name: item.name,
        model: item.model,
        color: item.color,
        price: item.price,
        image: item.image,
      }),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Item added to recent");
        getRecentView();
      });
    }
    else
    {
      return ;
    }
  };
  const Show = (item) => {
    // debugger;
    setId(item.id);
    setBrand(item.name);
    setModel(item.model);
    setColor(item.color);
    setPrice(item.price);
    setImg(item.image);
    setView(true);
    updateRecent(item);
  };

  const arr={array:[1,2,3,4]}
  arr.array.reverse();
  console.log("Array",arr);
  return (
    <>
      {view && (
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
          <div className="modal-dialog modal-lg">
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
                  onClick={() => setView(false)}

                  // onClick={() => clear()}
                ></button>
              </div>
              <div className="modal-body">
                <div className="modal-main">
                  <div className="picdiv text-center shadow p-3 mb-5 bg-white rounded" >
                    <img src={img} width={200} height={200}></img>
                    </div>
                   
                    
                    
                  <div className="infodiv   shadow p-3 mb-5 mt-2 bg-white rounded">
                     <p className="text-center" style={{fontSize:"25px", fontWeight:"bolder"}}>{brand} {model}({color})</p>
                     <ul>
                       <li>
                          Ram : 8GB
                       </li>
                       <li>
                          Storage : 128GB
                       </li>
                       <li>
                          Battery capacity : 5000 GHZ
                       </li>
                       <li>
                          price: {price}
                       </li>
                     </ul>
                     <button className="btn btn-primary mx-2" onClick={()=>copyProduct()}>BUY NOW</button>
                    <button className="btn btn-success">Add to Cart </button>
                    </div>
                </div>
                
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setView(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`page-wrapper ${view ? "low-opacity" : ""}`}>
        {status === "Admin" && (
          <button onClick={additem} className="btn btn-success">
            Add new Gadget
          </button>
        )}

        <h3>Mobiles</h3>
        <div className="all-content">
          {mobileList.map((item) => {
            return (
              <>
                <div className="collection">
                  <img
                    className="btn"
                    src={item.image}
                    width={"200px"}
                    height={"200px"}
                    onClick={() => Show(item)}
                  ></img>

                  <table>
                    <tr>{item.brand}</tr>
                    <tr>Model: {item.model}</tr>
                    <tr>Color: {item.color}</tr>
                    <tr>Price: {item.price}</tr>
                    <hr></hr>
                    <button type="button" class="btn btn-primary" onClick={()=>AddItem()}>
                      Buy
                    </button>

                    {cart.some(
                      (element) =>
                        element.product_id === item.id && element.quantity >= 1
                    ) ? (
                      <>
                        {cart
                          .filter((e) => e.product_id === item.id)
                          .map((element) => {
                            return (
                              <>
                                <button
                                  className="btn "
                                  onClick={() => decrease(element)}
                                >
                                  -
                                </button>

                                <input
                                  value={element.quantity}
                                  readOnly
                                ></input>
                                <button
                                  className="btn "
                                  onClick={() => increase(element)}
                                >
                                  +
                                </button>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <button
                        className="btn btn-primary mx-3"
                        onClick={() => copyProduct(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                    {favItem.some((e) => e.pId === item.id) ? (
                      <img
                        className="btn"
                        onClick={() => AddFav(item)}
                        src="https://static.thenounproject.com/png/1485114-200.png"
                        width={50}
                        height={50}
                      ></img>
                    ) : (
                      <img
                        className="btn"
                        onClick={() => AddFav(item)}
                        src="https://w7.pngwing.com/pngs/942/419/png-transparent-bookmark-favorite-love-save-like-essential-icon-thumbnail.png"
                        width={50}
                        height={50}
                      ></img>
                    )}
                  </table>
                </div>
              </>
            );
          })}
        </div>
        <hr></hr>
        <h3>Laptops</h3>
        <div className="all-content">
          {laptopList.map((item) => {
            return (
              <>
                <div className="collection ">
                  <img src={item.image} width={"200px"} height={"200px"}></img>
                  <table>
                    <tr>{item.brand}</tr>
                    <tr>Ram: {item.Ram}</tr>
                    <tr>Color: {item.color}</tr>
                    <tr>Price: {item.price}</tr>
                    <hr></hr>
                    <button type="button" class="btn btn-primary" onClick={()=>AddItem()}>
                      Buy
                    </button>

                    {cart.some(
                      (element) =>
                        element.product_id === item.id && element.quantity >= 1
                    ) ? (
                      <>
                        {cart
                          .filter((e) => e.product_id === item.id)
                          .map((element) => {
                            return (
                              <>
                                <button
                                  className="btn "
                                  onClick={() => decrease(element)}
                                >
                                  -
                                </button>

                                <input
                                  value={element.quantity}
                                  readOnly
                                ></input>
                                <button
                                  className="btn "
                                  onClick={() => increase(element)}
                                >
                                  +
                                </button>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <button
                        className="btn btn-primary mx-3"
                        onClick={() => copyProduct(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                    {favItem.some((e) => e.pId === item.id) ? (
                      <img
                        className="btn"
                        onClick={() => AddFav(item)}
                        src="https://static.thenounproject.com/png/1485114-200.png"
                        width={50}
                        height={50}
                      ></img>
                    ) : (
                      <img
                        className="btn"
                        onClick={() => AddFav(item)}
                        src="https://w7.pngwing.com/pngs/942/419/png-transparent-bookmark-favorite-love-save-like-essential-icon-thumbnail.png"
                        width={50}
                        height={50}
                      ></img>
                    )}
                  </table>
                </div>
              </>
            );
          })}
        </div>

        <h3>Recentally Viewed</h3>
        <div className="all-content">
          {recent.map((item) => {
            console.log("reverse",item  )
            return (
              <>
                <div className="shadow p-3 m-5 mt-2 bg-white rounded ">
                  <img src={item.image} width={"200px"} height={"200px"}></img>
                  <table className="mt-5">
                    <tr>{item.brand}</tr>
                    <tr><strong>Name:</strong> {item.model}</tr>
                    <tr><strong>Color:</strong> {item.color}</tr>
                    <tr><strong>Price:</strong> {item.price}</tr>
                    
                  </table>
                </div>
              </>
            );
          }).reverse()}
        </div>
      </div>
    </>
  );
}
