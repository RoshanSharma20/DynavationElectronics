const express = require('express');
const CategoryModel = require('../models/CategoryModel');
const { default: slugify } = require('slugify');

module.exports.createCategory = async function (req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ error: "Name is Required" });
        }
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            })
        }

        const category = await new CategoryModel({ name, slug: slugify(name) }).save();
        return res.status(201).json({
            success: true,
            message: "new category created",
            category
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in Category",
            err
        })
    }
}


module.exports.updateCategory = async function (req, res) {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in updating category".
                err
        })
    }
}


//get all categories
module.exports.category = async function (req, res) {
    try {
        const category = await CategoryModel.find({});
        return res.status(200).send({
            success: true,
            message: "All Categories List",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error
        })
    }
}


//get a single category
module.exports.singleCategory = async function (req, res) {
    try {
        const { slug } = req.params;
        const category = await CategoryModel.findOne({ slug });
        if (category) {
            return res.status(200).json({
                success: true,
                message: "get single category successfully",
                category
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "no single category found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in getting single category",
            error
        })
    }
}


//delete category
module.exports.deleteCategory = async function (req, res) {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndDelete(id);
        if (category) {
            return res.status(200).json({
                success: true,
                message: "category deleted successfully",
                category
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "no category found to delete"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting category",
            error
        })
    }
}