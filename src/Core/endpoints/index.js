const devUrl = 'http://localhost:5001/wakandha-c7cea/us-central1/';
const prodUrl = 'https://us-central1-wakandha-c7cea.cloudfunctions.net/';

const isDev = __DEV__;

const currentUrl = isDev ? devUrl : prodUrl;

export default {
  // Paypal payment
  APIPaypalPayment: `${currentUrl}pay`,
  APIGenerateSession: `${currentUrl}generateSessionTokBox`,

  // Airtel payment
  APIAirtelPayment: `https://mypvit.com/pvit-secure-full-api.kk`,
  APIAirtelPaymentMarchand: `077781546`,
};
