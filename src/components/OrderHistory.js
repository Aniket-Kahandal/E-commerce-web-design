import React, { useEffect, useState, useContext } from "react";
import { Usercontext } from "../Context/Context";
import { useLocation } from "react-router-dom";

export default function OrderHistory() {
  const [orderList, setOrderList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [orderId, setOrderId] = useState("");
  const { status, userId, username } = useContext(Usercontext);
  const [bill, setBill] = useState(0);
  const [mobile, setMobile] = useState("");
  const location = useLocation();
  const data = location.state;
  

  useEffect(() => {
    getOrderList();
    getUser();
  }, []);

  const getUser = () => {
    fetch("http://localhost:8080/Users")
      .then((Response) => Response.json())
      .then((result) => setUserData(result));
  };

  const getOrderList = () => {
    fetch("http://localhost:8084/orders")
      .then((response) => response.json())
      .then((result) => {
        const groupedOrders = result.reduce((acc, order) => {
          if (!acc[order.id]) {
            acc[order.id] = { ...order, items: [] };
          }
          acc[order.id].items.push(order);
          return acc;
        }, {});
        setOrderList(Object.values(groupedOrders));
      });
  };

  useEffect(() => {
    let sum = 0;
    orderList
      .filter((e) => e.id == orderId)
      .map((item) => {
        sum += item.items.reduce((total, currentItem) => total + currentItem.quantity * currentItem.price, 0);
      });
    setBill(sum);
  }, [orderId, orderList]);

  useEffect(() => {
    userData
      .filter((item) => item.id === userId)
      .map((e) => {
        setMobile(e.mobile);
      });
  }, [userData, userId]);

  return (
    <>
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="table-responsive">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Order Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList
                .filter((e) => e.UserId === userId)
                .map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.TotalAmount}</td>
                    {/* <td>{order.items.reduce((sum, item) => sum + item.quantity * item.price, 0)}</td> */}
                    <td>{order.OrderDate}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => setOrderId(order.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    View Details
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  
                  <p>
                    <strong>Order_Id: {orderId}</strong>
                  </p>
                  <p>
                    <strong>Customer Name: </strong>
                    {username}
                  </p>
                  <p>
                    <strong>Mobile Number: </strong>
                    {mobile}
                  </p>
                  <p>
                    <strong>Address: </strong> {data?.Address}
                  </p>
                  {orderList.filter((e)=>e.id===orderId).map((item)=>{
                    return(
                      <>
                      <div key={item.id}>
                        <hr></hr>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Product Id</th>
                                <th scope="col">Product name</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price</th>
                                <th scope="col">Pay mode</th>
                                <th scope="col">Total Price</th>
                              </tr>
                            </thead>
                            <tbody>
                            {item.CartItems.map((cart, index) => {
                    console.log("Data in orderList,",item)

                            return (
                              <tr key={index}>
                                <td>{cart.pId}</td>
                                <td>{cart.Product_Name}</td>
                                 <td>{cart.quantity}</td>
                                <td>{cart.price}</td>
                                <td>{cart.PaymentMode}</td>
                                <td>{cart.price * cart.quantity}</td>
                                 </tr>
                            );
                          })}
                            <tr>
                      {/* <th scope="row"></th> */}
                      <td colspan="5" style={{textAlign:"end"}}>< strong>Total Amount</strong></td>
                      <td ><strong>{item.TotalAmount}</strong></td>
                    </tr>
                            </tbody>
                          </table>
                          <p className="text-center mt-30px">
                            <strong>Thank you for Shopping with us !!</strong>
                            
                          </p>
                        </div>
                      </div>
                      </>
                    )
                  })}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
