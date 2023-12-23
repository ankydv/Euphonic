import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from "../state/action-creators";
import axios from 'axios';

const  SERVER = process.env.REACT_APP_AUTH_SERVER;

const Login = () => {

  const [credential, setCredential] = useState({email:"",password:""})

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {login} = bindActionCreators(actionCreators,dispatch);

  const authenticateLogin = async () => {
    const response = await fetch(`${SERVER}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({email:credential.email,password:credential.password}),
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      dispatch(login(json.authtoken)); 
      console.log('success');
      return true;
    }
    else{
      console.log('invalid credentials');
      return false;
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await authenticateLogin();
    if(res)
      navigate('/');
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
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
                id="email"
                placeholder="Username"
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
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={onChange}
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
