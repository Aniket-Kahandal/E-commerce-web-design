import React, { useEffect, useState, useContext } from "react";
import { Usercontext } from "../Context/Context";
import { useLocation } from "react-router-dom";

export default function OrderHistory() {
  const [orderList, setOrderList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [customer, setCustomerName] = useState("");
  const { status, userId, username } = useContext(Usercontext);
  const [bill, setBill] = useState(0);
  const[Address,setAddress]=useState("");
  const location = useLocation();
  const data = location.state;
  // console.log("data",data.address);
  useEffect(() => {
    const data1 = location.state;
    // console.log("Data from cart", data1?.address);
  }, [orderList]);

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
      .then((result) => setOrderList(result));
  };

  useEffect(() => {
    userData
      .filter((item) => item.id === userId)
      .map((e) => {
        setCustomerName(e.mobile);
      }, []);
  });
  //   console.log("Type is ", typeof orderList);
  //   console.log("Order data ", orderList);
  console.log("Log in Status", status, "Username", userId);
  // console.log("Log by Username:", user)
  useEffect(() => {
    let cartSum = 0;
    orderList
      .filter((item) => item.UserId == userId)
      .map((e) => {
        cartSum = cartSum + e.quantity * e.price;
        setBill(cartSum);
      });
  }, [orderList]);

  // data.address === null ? setAddress("ABC") : setAddress(data?.address)
  return (
    // <div style={{ marginTop: "100px" }}>

    //   <h3 className="text-center"   > Orders History</h3>
    //   <table class="table table-bordered " >
    //     <thead class="thead-dark">
    //       <tr>
    //         <th scope="col">Id</th>
    //         <th scope="col">product Id</th>
    //         <th scope="col">UserId </th>
    //         <th scope="col">Product Name</th>
    //         <th scope="col">price</th>
    //         <th scope="col">Quantity</th>
    //         <th scope="col">Total Amount</th>
    //         <th scope="col">Payment mode</th>

    //       </tr>
    //     </thead>
    //     {orderList.filter((element)=>element.UserId===userId ).map((item) => {
    //       return (
    //         <tbody>
    //           <tr>
    //             <th scope="row">{item.id}</th>
    //             <td>{item.pId}</td>
    //             <td>{item.UserId}</td>
    //             <td>{item.Product_Name}</td>
    //             <td>{item.price}</td>
    //             <td>{item.quantity}</td>
    //             <td>{item.price * item.quantity}</td>
    //             <td>{item.PaymentMode}</td>

    //           </tr>

    //         </tbody>
    //       );
    //     })}
    //   </table>
    //   <p>Login status {status}</p>
    //     <p>Login by {userId}</p>

    // </div>
    <>
      <div style={{ marginTop: "100px", padding: "50px" }}>
        <h3 className="text-center">Order History</h3>

        <p>
          <strong>Order_Id: {orderList.length} </strong>
        </p>
        <p>
          <strong>Customer Name: </strong>
          {username}
        </p>
        <p>
          <strong>Mobile Number: </strong>
          {customer}
        </p>
        <p>
          <strong>Address: </strong>{data.address}
          
        </p>

        <hr></hr>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Product Id</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          {orderList
            .filter((item) => item.UserId == userId)
            .map((element) => {
              return (
                <tbody>
                  <tr>
                    <td>{element.pId}</td>
                    <td>{element.quantity}</td>
                    <td>{element.price}</td>
                    <td>{element.price * element.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
        <div
          style={{
            textAlignLast: "center",
            paddingLeft: "480px",
            fontSize: "20px",
            fontFamily: "bold",
          }}
        >
          <p>
            <strong>Total Price : {bill}</strong>
          </p>
        </div>
        <p className="text-center mt-30px">
          <strong>Thank you for Shopping with us !!</strong>
        </p>
      </div>
    </>
  );
}
