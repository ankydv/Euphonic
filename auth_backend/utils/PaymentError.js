class PaymentError extends Error {
  constructor(message, errorType) {
    super(message);
    this.errorType = errorType;
    this.name = this.constructor.name;
    this.userMessage = this.getUserMessage(errorType);
  }

  getUserMessage(errorType) {
    switch (errorType) {
      case "StripeCardError":
        return "Your card has been declined.";
      case "StripeInvalidRequestError":
        return "Invalid payment information.";
      case "StripeAPIError":
        return "Payment service is currently unavailable.";
      default:
        return "An unexpected error occurred.";
    }
  }
}

module.exports = PaymentError;
