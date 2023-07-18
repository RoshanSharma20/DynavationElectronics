const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'categoryModel',
        required: true
    },
    subCategory: {
        type: mongoose.ObjectId,
        ref: 'subCategoryModel',
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean
    },
    url_link: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const ProductModel = mongoose.model('productModel', productSchema);
module.exports = ProductModel;