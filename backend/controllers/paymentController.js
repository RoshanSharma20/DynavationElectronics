const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_SECRET_KEY })


module.exports.getPaymentKey = async function (req, res) {
    return res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    });
}
module.exports.checkout = async function (req, res) {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        return res.status(200).send({
            success: true,
            order
        })
    } catch (error) {
        console.log("Error during checkout");
        return res.status(500).send(error);
    }
}


module.exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            res.redirect(
                `http://localhost:3000/#/paymentsuccess`
            );
        }
        else {
            return res.status(400).send({
                success: false
            })
        }
    } catch (error) {
        console.log("Error during payment verification");
        return res.status(500).send({
            success: false,
            error
        });
    }
}
