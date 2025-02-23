import jwt from "jsonwebtoken";

const ACTIVATION_SECRET = "ASIUDOASNDUH(*@HQIENDQ";

const createJwtToken = (user) => {
  const token = jwt.sign({ user }, ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
  return token;
};

const verifyJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, ACTIVATION_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export default {createJwtToken , verifyJwtToken};