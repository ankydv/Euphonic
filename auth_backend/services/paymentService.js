const stripe = require("../configs/stripeClient");
const PaymentError = require("../utils/PaymentError");

const createCustomer = async (userDetails) => {
  try {
    const customer = await stripe.customers.create(userDetails);
    return customer;
  } catch (error) {
    throw new PaymentError(error.message, error.type);
  }
};

const addCardToCustomer = async (tokenId, email) => {
  try {
    // Create a new customer or retrieve an existing one
    let customer = await stripe.customers.list({ email: email });
    customer = customer.data[0];

    // Retrieve the new card's details using the token
    const token = await stripe.tokens.retrieve(tokenId);
    const newCardFingerprint = token.card.fingerprint;

    // Retrieve the customer's existing cards to check for duplicates
    const existingCards = await stripe.customers.listSources(customer.id, {
      object: "card",
    });

    // Check if the new card's fingerprint matches any existing card fingerprint
    const isDuplicateCard = existingCards.data.some(
      (card) => card.fingerprint === newCardFingerprint
    );

    if (isDuplicateCard) {
      // Handle the duplicate card scenario
      throw new Error("This card is already added to the customer.");
    } else {
      // Add the card to the customer as it's not a duplicate
      const res = await stripe.customers.createSource(customer.id, {
        source: tokenId,
      });
      return res;
    }
  } catch (error) {
    // Replace with your custom error handling
    throw new PaymentError(error.message, error.type);
  }
};

// services/paymentService.js

const createPaymentIntent = async (data) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 101,
      currency: "inr",
      description: 'Software development services',
      shipping: {
        name: 'Customer Name', // Replace with the actual customer's name
        address: {
          line1: 'Address line 1', // Replace with the actual address line 1
          line2: 'Address line 2', // Optional, replace with the actual address line 2 or remove if not needed
          city: 'City', // Replace with the actual city
          state: 'State', // Replace with the actual state
          postal_code: '11001', // Replace with the actual postal code
          country: 'US' // Replace with the actual country code (e.g., 'IN' for India)
        }
      }
    });
    return paymentIntent.client_secret;
  } catch (error) {
    // Replace with your custom error handling
    throw new PaymentError(error.message, error.type);
  }
};

module.exports = {
  createCustomer,
  addCardToCustomer,
  createPaymentIntent,
};
