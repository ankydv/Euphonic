import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="form-box">
      <div className="header-form">
        <h4 className="text-primary text-center">
          <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
        </h4>
      </div>
      <div className="body-form">
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <div></div>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
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
              className="form-control"
              placeholder="Email"
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
              placeholder="Password"
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
              placeholder="Confirm Password"
            />
          </div>
          <button type="button" className="btn btn-secondary btn-block">
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
