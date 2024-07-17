import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./BuyItem.css";
import { Usercontext } from "../Context/Context";

export default function BuyItem() {
  const location = useLocation();
  const data = location.state;
  // const { status, setStatus } = useContext(Usercontext);

  const [cart, setCartList] = useState([]);
  const [itemPrice, setItemPrice] = useState(0);
  const { count, removeItemFromCart, status, userId, username } =
    useContext(Usercontext);
  const [bill, setBill] = useState(0);
  const [payMode, setPayMode] = useState("");
  const [modal, setModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  let id = userId;
  // ---------------------address states--------------
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const districts = {
    Maharashtra: ["Nashik", "Pune", "Mumbai", "SambhajiNagar"],
    Kashmir: ["Jammu", "Samba", "Reasi"],
  };
  const [district, setDistrict] = useState("");

  // ------------Errors msg---------
  let [addressError, setAddressError] = useState("");
  let [stateError, setStateError] = useState("");
  let [districtError, setDistrictError] = useState("");
  let [postError, setPostError] = useState("");
  const navigate = useNavigate();

  console.log("Log in status", status);
  console.log("Login name", username);

  useEffect(() => {
    getList();
    handlePrice();

    getOrderList();
    // handleAdress();
  }, []);

  useEffect(() => {
    let cartSum = 0;
    cart.map((item) => {
      cartSum = cartSum + item.quantity * item.price;
      setBill(cartSum);
    });
  }, [cart]);

  useEffect(() => {
    const data1 = location.state;
    console.log("Data from cart", data1.bil);
  }, []);
  const getList = () => {
    fetch("http://localhost:8081/CartItems")
      .then((response) => response.json())
      .then((Result) => setCartList(Result));
  };

  const getOrderList = () => {
    fetch("http://localhost:8084/orders")
      .then((response) => response.json())
      .then((result) => setOrderList(result));
  };

  const handlePrice = () => {};

  console.log("List", cart);
  const increase = (item) => {
    fetch("http://localhost:8081/CartItems/" + item.id, {
      method: "PUT",
      body: JSON.stringify({
        id: item.id,
        image: item.image,
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
        getList();
        // setBill((item.quantity*item.price))
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
          image: item.image,

          name: item.name,
          color: item.color,
          quantity: item.quantity - 1,
          price: item.price,
        }),
        headers: { "Content-type": "application/json" },
      })
        .then((Response) => Response.json())
        .then((result) => {
          getList();
          // setBill((item.quantity*item.price))
        });
    }
    if (item.quantity - 1 === 0) {
      fetch("http://localhost:8081/CartItems/" + item.id, {
        method: "DELETE",
      })
        .then((Response) => Response.json())
        .then((result) => {
          getList();
          // addItemToCart(result);

          alert("item deleted");
          removeItemFromCart(item.id);
        });
    }
  };
  const handlePayment = () => {
    // console.log("Payment mode",payMode);
    alert(`Payment Recieved by ${payMode}`);
  };

  const handleAddressSubmit = (item) => {
    item.preventDefault();
    // {console.log("State selected",state)}
    let isValid = ValidateAddress();
    console.log("Validation msg", isValid);
    // setModal(false);
  };
  const ValidateAddress = () => {
    console.log("state", state);
    let error = false;
    if (!address.trim()) {
      setAddressError("address is Mandatory");
      error = true;
    } else {
      setAddressError("");
    }
    if (!state.trim()) {
      setStateError("State is Mandatory");
      error = true;
    } else {
      setStateError("");
    }
    return error;
  };
  const clear = () => {
    setAddress("");
    setState("");
    setDistrict("");
    setAddressError("");
    setStateError("");
    setDistrictError("");
    setPostError("");
    setModal(false);
  };
  {
    console.log("add Error", addressError);
  }
  const handleOrder = () => {
    cart.map((item) => {
      fetch("http://localhost:8084/orders", {
        method: "POST",
        body: JSON.stringify({
          id: "" + (orderList.length + 1),
          pId: item.product_id,
          UserId: "" + userId,
          Product_Name: item.name,
          price: item.price,
          quantity: item.quantity,

          PaymentMode: payMode,
        }),
        headers: { "content-type": "application/json" },
      })
        .then((Response) => Response.json())
        .then((result) => {
          getOrderList();
          alert("Item addded to Success History");
        });
    });

    fetch("http://localhost:8081/CartItems", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((Result) => setCartList(Result));

    navigate("/orderhistory", { state: { address, bill } });
    console.log("Address in Buy ", address);
  };
  return (
    <>
      <div className="wrapper">
        <div className="card w-75 mb-3  ">
          <div className="shadow p-3 m-5 mt-2 bg-white rounded ">
            <div className="text-center ">
              <div>
                <h4>Enter address Details</h4>
              </div>
              <div>
                <form onSubmit={handleAddressSubmit}>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="textHelp"
                      placeholder="Enter Full address Flat no/Building name, locality"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {console.log("address ", address)}
                    <span style={{ color: "red" }}>{addressError}</span>
                  </div>
                  <div className="row g-3 form-control">
                    <select
                      className="form-select form-select-lg mb-3"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option selected value={"Select"}>
                        Select State....
                      </option>

                      <option value={"Maharastra"}>Maharashtra</option>
                      <option value={"Kashmir"}>Kashmir</option>
                      <option>UP</option>
                      <option>Bihar</option>
                      <option>Rajsthan</option>
                    </select>
                    <span style={{ color: "red" }}>{stateError}</span>
                    {/* {console.log("State Error",errors.AddressError)} */}

                    <select className="form-select form-select-lg mb-3">
                      <option selected>Select City....</option>
                      {state === "Maharastra" &&
                        districts.Maharashtra.map((item) => {
                          console.log("City name ", item);
                          return <option>{item}</option>;
                        })}
                      {state === "Kashmir" &&
                        districts.Kashmir.map((item) => {
                          console.log("City name ", item);
                          return <option>{item}</option>;
                        })}
                    </select>
                  </div>
                  <div className="row g-3 align-items-center">
                    <div class="col-auto">
                      <input
                        type="text"
                        id="Post"
                        class="form-control"
                        aria-describedby="post"
                        placeholder="POST"
                      />
                    </div>
                    <div class="col-auto">
                      <input
                        type="number"
                        id="Pincode"
                        class="form-control"
                        aria-describedby="pincode"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div class="save">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleAddressSubmit}
                >
                  save
                </button>
              </div>

            </div>
           
          </div>
          <div className="shadow p-3 m-5 mt-2 bg-white rounded text-center ">
              <h3 className="text-center">Payment Detail</h3>
              <input
                class="form-check-input save"
                type="radio"
                name="exampleRadios"
                id="UPI"
                value="option1"
                checked
                onClick={() => setPayMode("UPI")}
              />
              <label class="form-check-label save" for="UPI">
                UPI
              </label>
              <input
                class="form-check-input save"
                type="radio"
                name="exampleRadios"
                id="DEBIT"
                value="option1"
                onClick={() => setPayMode("DEBIT")}
              />
              <label class="form-check-label save" for="DEBIT">
                DEBIT CARD
              </label><br></br>
              {payMode=="UPI" && (
                <>
                   <img src="https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/a3202e58-17ef-11ee-9a70-8e93953183bb/cleaned_qr.png" width={100} height={100}></img>
                   <p><strong>Scan above code for </strong></p>
                </>
              )}
            </div>
        </div>

        <div className="card w-50 ">
          <div className="card-body">
            <h5 className="card-title">PRICE DETAILS</h5>
            {/* {cart.map((item) => { */}
            {/* return( */}

            <div>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Price</th>
                    <td>{bill}</td>
                  </tr>
                  <tr>
                    <th scope="row">Discount</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th scope="row">Coupons</th>
                    <td colspan="2">-</td>
                  </tr>
                  <tr>
                    <th scope="row">Delivary charges </th>
                    <td colspan="2">20</td>
                  </tr>
                  <hr></hr>
                  <tr>
                    <th scope="row">Total Amount </th>
                    <td colspan="2">{bill + 20}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-secondary"
                onClick={() => handleOrder()}
              >
                PLACE ORDER
              </button>
            </div>

            {/* ) */}
            {/* })} */}
          </div>
        </div>
        {/* <p>Login Status :{status}</p>
        <p>Login Id :{userId}</p> */}
      </div>
    </>
  );
}
