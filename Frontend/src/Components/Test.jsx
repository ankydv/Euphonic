import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Container, CssBaseline, useTheme } from '@mui/material';
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe('pk_test_51PCitgSAsvsjn3avNtmpzVwUXVYlIf3jiQSboowwKauGkXtRvQ0LAEYTSeMt0ylAieHvOkkuHy0iiVyCAgoKU97f00e44JqTJu');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();

  const handleSubmit = async (event) => {
    console.log('sending')
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.')
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Token:', token);
      // Send the token to your server here
    }
  };
  const cardStyle = {
    style: {
      base: {
        fontWeight: '500',
        color: theme.palette.mode === 'dark' ? 'white' : '#000000',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: theme.palette.primary.light },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    },
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
    <form  onSubmit={handleSubmit}>
    <div
        style={{
          height: '100%',
          marginTop: '100px',
          // alignItems: 'center',
          display: "flex",
          flexDirection: "column",
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
      <CardElement options={cardStyle} />
      <button onClick={handleSubmit} type="submit" disabled={false}>
        Pay
      </button>
      </div>
    </form>
    
    </Container>
  );
};

const Test = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Test;
