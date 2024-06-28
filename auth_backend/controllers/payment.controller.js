// server/controllers/razorpayController.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: 'INR',
    
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};