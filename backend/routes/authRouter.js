const express = require('express');
const { registerCustomer, loginCustomer, forgotPassword, testing, updateProfile, getOrders, getAllOrders, orderStatus } = require('../controllers/authController');
const { requireSignIn, isAuthorised } = require('../middlewares/authMiddleware');

const authRouter = express.Router();//creating a router object

//sign up new customer
authRouter.post('/register', registerCustomer);

//login customer
authRouter.post('/login', loginCustomer);

//forgot password
authRouter.post('/forgot-password', forgotPassword, (req, res) => {
    res.status(200).json({
        ok: true
    })
});

//testing protectroute
authRouter.get('/test', isAuthorised, testing);

//protected user route auth
authRouter.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//protected admin route auth
authRouter.get('/admin-auth', requireSignIn, isAuthorised, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
authRouter.put('/profile', requireSignIn, updateProfile);

//orders
authRouter.get('/orders', requireSignIn, getOrders);


//all orders
authRouter.get("/all-orders", requireSignIn, isAuthorised, getAllOrders);

// order status update
authRouter.put(
    "/order-status/:orderId",
    requireSignIn,
    isAuthorised,
    orderStatus
);

module.exports = authRouter;