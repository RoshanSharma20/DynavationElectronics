const express = require('express');
const { checkout, paymentVerification, getPaymentKey } = require('../controllers/paymentController');
const paymentRouter = express.Router();

paymentRouter.get('/get-payment-key', getPaymentKey);
paymentRouter.route('/checkout').post(checkout);
paymentRouter.route('/paymentverification').post(paymentVerification);

module.exports = paymentRouter;