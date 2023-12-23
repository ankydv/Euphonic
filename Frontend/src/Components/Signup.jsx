import React, {useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../state/action-creators";
import { useDispatch } from "react-redux";

const  SERVER = process.env.REACT_APP_AUTH_SERVER;

const Signup = (props) => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState({ name:"", email:"",password:"",cpassword:""})
    let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credential)
    const {name,email,password}=credential
    const response = await fetch(`${SERVER}api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,email,password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      dispatch(login(json.authtoken))
      navigate("/");
       console.log('success')
    } else {
      // props.showAlert("Invalid Details","danger");
      console.log('failse')
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-box">
      <div className="header-form">
        <h4 className="text-primary text-center">
          <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
        </h4>
      </div>
      <div className="body-form">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <div></div>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              onChange={onChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
            <div></div>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              name="cpassword"
              className="form-control"
              placeholder="Confirm Password"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-block">
            SIGNUP
          </button>
          <div className="message">
            <div>
              <Link to="/login">Already a User? Sign In</Link>
            </div>
          </div>
        </form>
        {/* <div className="social">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter-square"></i>
          </a>
          <a href="#">
            <i className="fab fa-google"></i>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
