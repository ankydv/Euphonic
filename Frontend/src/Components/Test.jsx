import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Container, CssBaseline, useTheme } from '@mui/material';
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(publishableKey);

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
      console.log('Token:', token.id);
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
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: '1rem'
        }}
      >
      <CardElement options={cardStyle} />
      <button onClick={handleSubmit} type="submit" disabled={false}>
        Pay
      </button>
      </Box>
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
