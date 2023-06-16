const express = require('express');
const { requireSignIn, isAuthorised } = require('../middlewares/authMiddleware');
const { createProduct, getProducts, getSingleProduct, productImage, deleteProduct, updateProduct, productFilters, productCount, productList, searchProduct, relatedProduct, productCategory, braintreeToken, braintreePayment, productPriceFilters, paymentSuccessfull } = require('../controllers/productController');
const formidable = require('express-formidable');

const productRouter = express.Router();


//Routes
//create product
productRouter.post('/create-product', requireSignIn, isAuthorised, formidable(), createProduct)

//update product
productRouter.put('/update-product/:pid', requireSignIn, isAuthorised, formidable(), updateProduct)


// get products
productRouter.get('/get-product', getProducts);

//get single product
productRouter.get('/get-product/:slug', getSingleProduct);

//get image
productRouter.get('/product-image/:pid', productImage)

//delete product
productRouter.delete('/delete-product/:pid', requireSignIn, isAuthorised, deleteProduct);


//filter product
productRouter.post('/product-filters', productFilters);

//filter product by prices
productRouter.post('/product-price-filter', productPriceFilters)

//product count
productRouter.get('/product-count', productCount)

//product per page
productRouter.get('/product-list/:page', productList)

//search product
productRouter.get('/search/:keyword', searchProduct);

//similar products
productRouter.get('/related-product/:pid/:cid', relatedProduct)

//category wise product
productRouter.get('/product-category/:slug', productCategory)


//payments route
//get token first
productRouter.get('/braintree/token', braintreeToken)


//payments
productRouter.post('/braintree/payment', requireSignIn, braintreePayment);

// handling successfull payments
productRouter.post('/payment-successfull', requireSignIn, paymentSuccessfull)

module.exports = productRouter;