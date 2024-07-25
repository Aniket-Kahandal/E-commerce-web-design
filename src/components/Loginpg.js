import React, { createContext, useContext, useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Headers from "./Header";
import { Usercontext } from "../Context/Context";

const Loginpg = () => {
  const { status, setStatus } = useContext(Usercontext);
  let { userId ,setUserId} = useContext(Usercontext);
  let { username ,setUsername} = useContext(Usercontext);


  console.log("Status in Login page", status);
  const [Admin, setAdmin] = useState([]);
  const [data, setData] = useState([]);
  const [id, setid] = useState([]);

  // const [dependancy, setDependancy] = useState(false);
  const [username1, setUsername1] = useState("");
  const [pass, setPass] = useState("");
  const [category, setCategory] = useState("");
  // const [status , setStatus]=useState("");
  const navigate = useNavigate();
  let [usernameError, setUserError] = useState("");
  let [passError, setPassError] = useState("");


  useEffect(() => {
    getUser();

    getAdmin();
  }, []);

  const getUser = () => {
    // setDependancy(true)
    fetch("http://localhost:8080/Users")
      .then((Response) => Response.json())
      .then((result) => setData(result));
  };
  console.log(data, "data123");
  const getAdmin = () => {
    fetch("http://localhost:8080/Admin")
      .then((response) => response.json())
      .then((result) => {
        setAdmin(result);
        // console.log(result,"Result");
      });
  };

  const submit = (e) => {
    // getUser();
    let flag = 1;
    e.preventDefault();
    const isValid = validdData();
    if (!isValid) return;
    if (category === "user") {
      const update = data.map((item) => {
        if (item.username === username1 && item.password === pass) {
          alert("Login Success");
          setStatus("login");
          setUserId(item.id);
          setUsername(username1);
          flag = 0;
          navigate("/electronics");
        }
      });
    } else if (category === "Admin") {
      getAdmin();
      const detail =
        Admin &&
        Admin.map((item) => {
          if (item.username === username1 && item.password === pass) {
            alert("Login by Admin");

            setStatus("Admin");
            getAdmin();
            navigate("/insert");
          } else {
            alert("User not found");
          }
        });
    } else {
      alert("Invalid Credential");
      setStatus("logout");
    }
  };
  // console.log("Admin data",Admin);

  // console.log(data,"database");
  // console.log("category", category,"Username",username,"Pass",pass);
  // console.log("user",username,"pass",pass,"Status",status,category,"logged by")
  const validdData = () => {
    let isValid = true;
    if (!username1.trim()) {
      setUserError("Username mandatory");
      isValid = false;
    }

    if (!pass.trim()) {
      setPassError("Password mandatory");
      isValid = false;
    }
    return isValid;
  };
  // console.log("Error in Username: ", usernameError);
  console.log("Username: ", userId);

  return (
    <>
   
      <form className="form container text-center">
        <h3>Log in </h3>
        
        <div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={username1} onChange={(e)=>setUsername1(e.target.value)}/>
  <label for="floatingInput">Email address</label>
  <span style={{color:"red"}}>{usernameError}</span>
</div>

<div class="form-floating mb-3">
  <input type="email" class="form-control " id="floatingInput" placeholder="name@example.com" value={pass} onChange={(e)=>setPass(e.target.value)}/>
  <label for="floatingInput">Enter valid password</label>
  <span style={{color:"red"}}>{passError}</span>

</div>
        <div className="mb-3">
          <input
            type="radio"
            id="admin"
            name="fav_language"
            value="Admin"
            onChange={(e) => setCategory(e.target.value)}
            
          />
          <label for="admin">Admin</label>
          <input
            type="radio"
            id="user"
            name="fav_language"
            value="user"
            className="mx-3"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label for="user">User</label>
        </div>

        <button type="submit" className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </form>
      
    </>
  );
};
export default Loginpg;
