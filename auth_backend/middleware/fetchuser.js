import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const jwt_secret = process.env.REFRESH_TOKEN_SECRET;
//get the user from jwt token and add id to req object
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
    // res.send(data);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({
          error: "Token expired. Please authenticate using a new token",
        });
    }
    return res
      .status(401)
      .send({
        error: "Invalid token. Please authenticate using a valid token",
      });
  }
};

export default fetchuser;
