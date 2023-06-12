const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: [true, 'name of user is required']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    address: {
        type: {},
        required: [true, 'address is required']
    },
    answer: {
        type: String,
        required: [true, 'answer is required']
    },
    role: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const UserModel = mongoose.model('userModel', userSchema);
module.exports = UserModel;