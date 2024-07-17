import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './Electronics.css';
export default function RecentaView(props) {
  const [recent, setRecent] = useState([]);
  console.log("MobileList", props.list);
  useEffect(() => {
    getRecentView();
  }, []);
  const getRecentView = () => {
    fetch("http://localhost:8083/recent_View")
      .then((response) => response.json())
      .then((result) => setRecent(result));
  };
 console.log("Recentally viewed Data",recent)
  return (
    <>
      <div>
       {recent.map((item)=>{
          return(
            <div className="all-content">
             <div className="collection">
                <img src={item.image} width={50} height={50}></img>
                <label><strong>{item.name}</strong></label>
                <label>{item.model}</label>
                <label>{item.color}</label>

                </div>

             </div>
          )
       })}
      </div>
    </>
  );
}
