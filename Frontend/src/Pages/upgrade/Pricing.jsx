import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/system';

const plans = [
  {
    title: 'Ad Free',
    priceMonthly: 'Rs 19/mo',
    priceYearly: 'Rs 189/yr',
    features: ['Seamless streaming without ad', 'Basic donate plan'],
  },
  {
    title: 'Video',
    priceMonthly: 'Rs 29/mo',
    priceYearly: 'Rs 299/yr',
    features: ['Get access music videos', 'Access millions of music videos', 'Seamless switching between audio and video', 'Synchronised playback'],
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = React.useState('monthly');

  const handleBillingCycleChange = (event, newBillingCycle) => {
    if (newBillingCycle !== null) {
      setBillingCycle(newBillingCycle);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Pricing Plans
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Choose the plan that fits your needs.
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        <ToggleButtonGroup
          value={billingCycle}
          exclusive
          onChange={handleBillingCycleChange}
          aria-label="billing cycle"
        >
          <ToggleButton value="monthly" aria-label="monthly billing">
            Monthly
          </ToggleButton>
          <ToggleButton value="yearly" aria-label="yearly billing">
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item key={plan.title} xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <Typography component="h2" variant="h5" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  {billingCycle === 'monthly'
                    ? plan.priceMonthly
                    : plan.priceYearly}
                </Typography>
                <ul>
                  {plan.features.map((feature) => (
                    <Typography component="li" key={feature} variant="subtitle1">
                      {feature}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary">
                  Choose Plan
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PricingPage;
