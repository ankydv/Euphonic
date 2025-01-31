// src/components/GoogleSignIn.js
import React from "react";
import { auth } from "../../firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { login } from "../../state/action-creators";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useTheme } from "@mui/material";

const SERVER = process.env.REACT_APP_AUTH_SERVER;

const GoogleSignIn = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/youtube');
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post(
        `${SERVER}api/auth/firebase?isFirebaseToken=true`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const authtoken = res.data.authToken;
      localStorage.setItem("token", authtoken);
      localStorage.setItem("avatar", result.user.photoURL);
      dispatch(login(authtoken));
      navigate("/");
      // console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <GoogleButton label="Continue with google" type={theme.palette.mode} onClick={handleGoogleSignIn} />
  );
};

export default GoogleSignIn;
