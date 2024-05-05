const paymentService = require("../services/paymentService");

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
  const userId = req.params.userId;
  const { cardNumber, expMonth, expYear, cvc } = req.body;

  try {
    const card = await paymentService.addCard(
      userId,
      cardNumber,
      expMonth,
      expYear,
      cvc
    );
    res.status(201).json({ card });
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).send({ message: error.userMessage || "An error occurred" });
  }
};

module.exports = {
  createCustomer,
  addCard,
};
