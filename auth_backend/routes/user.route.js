import User from '../models/user.model.js';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import fetchuser from '../middleware/fetchuser.js';
import { signUp, signIn } from '../controllers/user.controller.js';
import { config } from 'dotenv';
config();

const router = Router();

const jwt_secret = "subhaisagood$oy";

//rout 1 create a user using: post "/api/auth/signup" no login requere
router.post('/signup', signUp)

router.post(
  "/signin",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  signIn
);

//rout 2 create a user using: post "/api/auth/login" no login requere
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can't be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .json({success, error: "User not found" });
      }
      const passwordCompare = await user.matchPassword(password);
      if (!passwordCompare) {
        success=false;
        return res
          .json({success, error: "Incorrect Password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
router.post('/signin', signIn);
//rout 3 get loged in user details using: post "/api/auth/getuser" no login requere
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/fetchuser',fetchuser)
export default router;
