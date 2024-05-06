const paymentService = require("../services/paymentService");
const PaymentError = require("../utils/PaymentError");

const createCustomer = async (req, res) => {
  try {
    const customerDetails = {
      name: req.body.name,
      email: req.body.email,
    };
    const customer = await paymentService.createCustomer(customerDetails);
    res.json(customer);
  } catch (error) {
    res.status(500).send({ message: error.userMessage || "An error occurred" });
  }
};

const addCard = async (req, res) => {
  try {
    const { tokenId, email } = req.body;
    const result = await paymentService.addCardToCustomer(tokenId, email);
    res.status(200).json({
      message: "Card Added Successfully",
      result,
    });
  } catch (error) {
    if (error instanceof PaymentError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("An unexpected error occurred");
    }
  }
};
module.exports = {
  createCustomer,
  addCard,
};
