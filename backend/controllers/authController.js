const express = require('express');
const UserModel = require('../models/UserModel.js');
const OrderModel = require('../models/OrderModel.js');
const { hashPassword, comparePassword } = require('../helpers/authHelper.js');
const jwt = require('jsonwebtoken');


module.exports.registerCustomer = async function registerCustomer(req, res) {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        //check user
        const exisitingUser = await UserModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new UserModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
}


//login customer || POST method
module.exports.loginCustomer = async function loginCustomer(req, res) {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
}

//forgot password
module.exports.forgotPassword = async function (req, res) {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).json({
                message: "Email is required"
            })
        }
        if (!answer) {
            res.status(400).json({
                message: "Answer is required"
            })
        }

        if (!newPassword) {
            res.status(400).json({
                message: "New Password is required"
            })
        }

        //check
        const user = await UserModel.findOne({ email, answer });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "wrong Email or Password"
            });
        }

        const hashed = await hashPassword(newPassword);
        await UserModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "password reset successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "something went wrong",
            err
        })
    }

}


//update profile
module.exports.updateProfile = async function (req, res) {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await UserModel.findById(req.user._id);
        //password
        if (password && password.length < 3) {
            return res.json({
                error: "Password is required and 4 characters long"
            })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in updating",
            error
        })
    }
}



//get orders
module.exports.getOrders = async function (req, res) {
    try {
        const orders = await OrderModel.find({ buyer: req.user._id }).populate("products", "-image").populate("buyer", "name");
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting orders",
            error
        })
    }
}


//orders
module.exports.getAllOrders = async function (req, res) {
    try {
        const orders = await OrderModel
            .find({})
            .populate("products", "-image")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
module.exports.orderStatus = async function (req, res) {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};

module.exports.testing = async function testing(req, res) {
    res.json({
        message: "isAuthorised is working"
    })
}


