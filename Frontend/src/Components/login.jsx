import React from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from "../state/action-creators";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {login} = bindActionCreators(actionCreators,dispatch);

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform authentication logic (e.g., API call) to get a token
    const authToken = 'yourAuthToken'; // Replace with the actual token
    dispatch(login(authToken)); // Dispatch the login action directly
    localStorage.setItem('token',authToken);
    navigate('/');
  };

  return (
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
        </div>
        <div className="body-form">
          <form onSubmit={handleLogin}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-block">
              LOGIN
            </button>
            <div className="message">
              <div>
                <input type="checkbox" /> Remember ME
              </div>
              <div>
                <a href="#">Forgot your password</a>
              </div>
            </div>
            <div>
              <Link to='/signup' >Create a new account</Link>
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

export default Login;
