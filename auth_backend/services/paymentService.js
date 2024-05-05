const stripe = require("../configs/stripeClient");
const PaymentError = require("../errors/PaymentError");

const createCustomer = async (userDetails) => {
  try {
    const customer = await stripe.customers.create(userDetails);
    return customer;
  } catch (error) {
    throw new PaymentError(error.message, error.type);
  }
};

const addCard = async (userId, cardNumber, expMonth, expYear, cvc) => {
  try {

    // console.log(cardToken)
    const newCard = await stripe.customers.createSource(userId, {
      source: 'tok_mastercard',
    });

    return newCard;
  } catch (error) {
    throw new PaymentError(error.message, error.type);
  }
};

module.exports = {
  createCustomer,
  addCard,
};
