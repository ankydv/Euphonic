const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentControllers");

router.get("/hello", (req, res) => {
  res.send("Hi from payment route");
});

router.post("/create-customer", paymentController.createCustomer);
router.post('/users/cards', paymentController.addCard);
router.post('/payment-intent', paymentController.createPaymentIntent);

module.exports = router;
