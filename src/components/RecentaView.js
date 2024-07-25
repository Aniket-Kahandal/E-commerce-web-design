import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Electronics.css";
export default function RecentaView(props) {
  const [fav, setFav] = useState([]);
  const [cartList, setCartList] = useState([]);
  console.log("MobileList", props.list);
  useEffect(() => {
    // getRecentView();
    getFav();
  }, []);
  // const getRecentView = () => {
  //   fetch("http://localhost:8083/recent_View")
  //     .then((response) => response.json())
  //     .then((result) => setRecent(result));
  // };
  const getFav = () => {
    fetch("http://localhost:8082/item")
      .then((response) => response.json())
      .then((result) => setFav(result));
  };
  useEffect(() => {
    fetch("http://localhost:8081/CartItems")
      .then((response) => response.json())
      .then((Result) => setCartList(Result));
  }, []);

  return (
    <>
      <div className="container">
        {fav.map((item) => {
          return (
            <>
              <div className="d-flex justify-content-center">
                <div
                  className="text-center shadow p-3 mb-5 bg-white rounded"
                  style={{ width: "30%", margin: "30px" }}
                >
                  <img src={item.image} width={160} height={200}></img>
                  <br></br>
                  {cartList
                    .filter((e) => e.product_id === item.pId)
                    .map((item) => {
                      return (
                        <>
                          <button className="btn btn">-</button>
                          <label>{item.quantity}</label>
                          <button className="btn btn">+</button>
                        </>
                      );
                    })}
                </div>
                <div
                  className="text-center shadow p-3 mb-5 bg-white rounded "
                  style={{ width: "40%" }}
                >
                  <h4>
                    <strong>
                      {item.Name}[{item.model}, {item.color}]
                    </strong>
                  </h4>
                  <li>
                    {" "}
                    <strong>RAM: </strong>8GB{" "}
                  </li>
                  <li>
                    {" "}
                    <strong>Battery: </strong>5000 MHZ{" "}
                  </li>
                  <li>
                    {" "}
                    <strong>OS: </strong>Android 14
                  </li>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
