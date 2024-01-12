import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import "./ForgotPassword.css";
// import Loader from "../layout/Loader/Loader";

// import { forgetPassword } from "../../Redux/action/user";
// import { toast } from "react-hot-toast";
// import MetaData from "../layout/Header/66";

const ForgotPassword = () => {


//   const { loading, error, message } = useSelector((state) => state.profile);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    // dispatch(forgetPassword(email));
  };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch({ type: "clearError" });
//     }

//     if (message) {
//       toast.success(message);
//       dispatch({ type: "clearMessage" });
//     }
//   }, [dispatch, error, message]);
  return (

        <>
          {/* <MetaData title={"Forgot Password"} /> */}
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="signUpPassword">
                  <CiMail />
                  <input
                    type="password"
                    placeholder="Enter your email..."
                    required
                    name="password"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
  );
};

export default ForgotPassword;