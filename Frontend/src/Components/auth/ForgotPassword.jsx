import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import {RiLockPasswordLine} from "react-icons/ri"
import "./ForgotPassword.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
// import Loader from "../layout/Loader/Loader";

// import { forgetPassword } from "../../Redux/action/user";
// import { toast } from "react-hot-toast";
// import MetaData from "../layout/Header/66";
const  SERVER = process.env.REACT_APP_AUTH_SERVER;

const ForgotPassword = () => {
  const [params] = useSearchParams();
  const tokenGenerated = params.get('token') ? true : false;

//   const { loading, error, message } = useSelector((state) => state.profile);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the "/api/user/mail" endpoint
      const response = await axios.post(`${SERVER}api/user/mail`, { email: email });
  
      // Check the response and handle it accordingly
      if (response.data.message) {
        setMessage(response.data.message)
      } else {
        setMessage(response.data.error); // Error message
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage("Something went wrong")
    }
  };

  return (

        <>
          {/* <MetaData title={"Forgot Password"} /> */}
          {!tokenGenerated ? <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="signUpPassword">
                  <CiMail />
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
                <p>{message}</p>
              </form>
            </div>
          </div>
          :
          <NewPassWordForm />}
        </>
  );
};

export default ForgotPassword;

const NewPassWordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [params] = useSearchParams();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [success, setSuccess] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password === confirmPassword) {
      // Passwords match, you can proceed with further actions
      try {
        const response = await axios.post(`${SERVER}api/user/validate?token=${encodeURIComponent(params.get('token'))}`, {
          password: password,
        });
        setMessage(response.data.message);
        setSuccess(true);
        // Countdown to redirect
        let countdownValue = 3;
        const countdownInterval = setInterval(() => {
          countdownValue -= 1;
          setCountdown(countdownValue);
        }, 1000);

        // Redirect to /login after the countdown
        setTimeout(() => {
          clearInterval(countdownInterval);
          navigate('/login');
        }, countdownValue * 1000);

      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.error);
        } else {
          console.error('Error:', error.message);
        }
      }

    } else {
      // Passwords do not match
      setPasswordMatch(false);
    }
  };

  return (
    <div className="forgotPasswordContainer">
    <div className="forgotPasswordBox">
      <h2 className="forgotPasswordHeading">Set New Password</h2>
      <form
        className="forgotPasswordForm"
        onSubmit={handleSubmit}
      >
        <div className="signUpPassword">
        <RiLockPasswordLine />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="signUpPassword">
      <RiLockPasswordLine />
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
        <input
          type="submit"
          value="Send"
          className="forgotPasswordBtn"
        />
        <p>{message}</p>
        {success&&<p>Redirecting to login... {countdown}</p>}
      </form>
    </div>
  </div>
  )
}
