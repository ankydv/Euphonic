import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const server = process.env.REACT_APP_AUTH_SERVER;

  useEffect(() => {
    // Fetch the client secret from your backend using Axios
    axios.post(server+'api/payment/payment-intent', {"amount": "10"})
      .then((response) => {
        setClientSecret(response.data.client_secret);
        console.log(response.data.client_secret)
      })
      .catch((error) => console.error('Error fetching client secret:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if(paymentIntent?.error){
            alert(paymentIntent.error.message)
            return
      }
      if (paymentIntent?.status === 'succeeded') {
        alert('success')
      } else {
        // Payment failed. Handle error (e.g., show error message to user)
        alert('failed')
      }
    } catch (error) {
      console.log('Error confirming payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

const Payment = () => (
    <div style={{marginTop: '100px'}}>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
  );

  export default Payment;