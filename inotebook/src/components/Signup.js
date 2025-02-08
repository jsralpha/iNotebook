import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


function Signup(props) {

const navigate = useNavigate()

const [credentials, setcredentials] = useState({name : "", email: "", password: "" , confirmPassword : ""});

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(credentials.password !== credentials.confirmPassword){
        console.log("password doesnot match!")
        props.showAlert("Password does not match","danger");
    }
    else{
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name : credentials.name,
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const json = await response.json();
          console.log(json);

          if(json.success){
            // localStorage.setItem("token",json.authtoken)
            navigate("/");
            props.showAlert("Successfully Signed-up ","success");

          }
          else{
            props.showAlert("user with this email id already exist","danger");
          }
    }
  }

  return (
    <div className="container">
        <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="conformPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
