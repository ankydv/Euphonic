import sign from "jsonwebtoken";

const ACTIVATION_SECRET = "ASIUDOASNDUH(*@HQIENDQ";

const createJwtToken = (user) => {
  const token = sign({ user }, ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
  return token;
};

export default createJwtToken;