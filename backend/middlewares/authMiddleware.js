const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');


//requireSignIn
module.exports.requireSignIn = async function requireSignIn(req, res, next) {
    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

//authorize function to check if the user is admin or not
//isAuthorized function
module.exports.isAuthorised = async function isAuthorised(req, res, next) {
    try {
        const user = await UserModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
}