const express = require('express');
const fs = require('fs');
const { default: slugify } = require('slugify');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const OrderModel = require('../models/OrderModel');
const braintree = require("braintree");
const dotenv = require('dotenv');

dotenv.config();

//payment gateway
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

module.exports.createProduct = async function (req, res) {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).json({ error: "name is required" })
            case !description:
                return res.status(500).json({ error: "description is required" })
            case !price:
                return res.status(500).json({ error: "price is required" })
            case !category:
                return res.status(500).json({ error: "category is required" })
            case !quantity:
                return res.status(500).json({ error: "quantity is required" })
            case image && image.size > 1000000:
                return res.status(500).json({ error: "image is required and size must be less than 1mb" })
        }

        const products = new ProductModel({ ...req.fields, slug: slugify(name) })

        if (image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type
        }
        await products.save();
        return res.status(200).json({
            success: true,
            message: "Product Created Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating product",
            error
        })
    }
}


//get all products
module.exports.getProducts = async function (req, res) {
    try {
        const products = await ProductModel.find({}).populate('category').select("-image").limit(12).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "get all products successfully",
            totalCount: products.length,
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting all producs",
            error
        })
    }
}


//get single product
module.exports.getSingleProduct = async function (req, res) {
    try {
        const { slug } = req.params;
        const product = await ProductModel.findOne({ slug }).select("-image").populate('category');
        if (product) {
            return res.status(200).json({
                success: true,
                message: "singleproduct found",
                product
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "no product found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting single product",
            error
        })
    }
}


//get product image
module.exports.productImage = async function (req, res) {
    try {
        const { pid } = req.params;
        const product = await ProductModel.findById(pid).select("image");
        if (product.image.data) {
            res.set('Content-type', product.image.contentType);
            return res.status(200).send(product.image.data);
        }
        else {
            return res.status(404).json({
                success: false,
                message: "product image with id not found"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting product image",
            error
        })
    }
}


//delete product
module.exports.deleteProduct = async function (req, res) {
    try {
        const { pid } = req.params;
        const product = await ProductModel.findByIdAndDelete(pid).select("-image");
        if (product) {
            return res.status(200).json({
                success: true,
                message: "product deleted successfully",
                product
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "no product found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting product",
            error
        })
    }
}


//update product
module.exports.updateProduct = async function (req, res) {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).json({ error: "name is required" })
            case !description:
                return res.status(500).json({ error: "description is required" })
            case !price:
                return res.status(500).json({ error: "price is required" })
            case !category:
                return res.status(500).json({ error: "category is required" })
            case !quantity:
                return res.status(500).json({ error: "quantity is required" })
            case image && image.size > 1000000:
                return res.status(500).json({ error: "image is required and size must be less than 1mb" })
        }

        const products = await ProductModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) });

        if (image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type
        }
        await products.save();
        return res.status(200).json({
            success: true,
            message: "Product updated Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating product",
            error
        })
    }
}


//filter products
module.exports.productFilters = async function (req, res) {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await ProductModel.find(args);
        if (products) {
            return res.status(200).json({
                success: true,
                message: "products found",
                products
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "no products found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Erro while filtering the product",
            error
        })
    }
}


//filter products by their prices
module.exports.productPriceFilters = async function (req, res) {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await ProductModel.find(args);
        if (products) {
            return res.status(200).json({
                success: true,
                message: "products found",
                products
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "no products found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while filtering the product",
            error
        })
    }
}


//product count
module.exports.productCount = async function (req, res) {
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount();
        return res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in product counting",
            error
        })
    }
}


//product list per page
module.exports.productList = async function (req, res) {
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await ProductModel.find({}).select("-image").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in per page control",
            error
        })
    }
}


//search product
module.exports.searchProduct = async function (req, res) {
    try {
        const { keyword } = req.params;
        const results = await ProductModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-image");
        return res.json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in per search product",
            error
        })
    }
}

//related products
module.exports.relatedProduct = async function (req, res) {
    try {
        const { pid, cid } = req.params;
        const products = await ProductModel.find({ category: cid, _id: { $ne: pid } }).select("-image").limit(3).populate("category");

        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting similar products",
            error
        })
    }
}

//category wise product
module.exports.productCategory = async function (req, res) {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        const products = await ProductModel.find({ category }).populate("category");

        return res.status(200).json({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting category product",
            error
        })
    }
}


//payment gateway api

//get braintree token
module.exports.braintreeToken = async function (req, res) {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//payments
module.exports.braintreePayment = async function (req, res) {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => { total += i.price });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new OrderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

// handling the successfull payments
module.exports.paymentSuccessfull = async function (req, res) {
    try {
        const { cart } = req.body;
        const order = new OrderModel({
            products: cart,
            payment: true,
            buyer: req.user._id,
        }).save();
        res.json({ ok: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating successfull payment",
            error
        })
    }
}