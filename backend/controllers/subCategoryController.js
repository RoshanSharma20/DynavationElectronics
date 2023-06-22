const express = require('express');
const SubCategoryModel = require('../models/SubCategoryModel');
const { default: slugify } = require('slugify');

module.exports.createSubCategory = async function (req, res) {
    try {
        const { name, category } = req.body;
        if (!name) {
            return res.status(401).send({ error: "Name is Required" });
        }
        if (!category) {
            return res.status(400).send({ error: "Category is Required" });
        }
        const existingSubCategory = await SubCategoryModel.findOne({ name });
        if (existingSubCategory) {
            return res.status(200).send({
                success: true,
                message: "SubCategory already exists"
            })
        }

        const categoryToSave = {
            name,
            category,
            slug: slugify(name)
        };

        const subcategory = await SubCategoryModel.create(categoryToSave);
        return res.status(201).json({
            success: true,
            message: "new sub-category created",
            subcategory
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


// update subcategory
module.exports.updateSubCategory = async function (req, res) {
    try {
        const { name } = req.body;
        const { id } = req.params;
        // const categoryToUpdate = {
        //     name,
        //     category,
        //     slug: slugify(name)
        // };
        const subcategory = await SubCategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        return res.status(200).json({
            success: true,
            message: "SubCategory updated successfully",
            subcategory
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in updating subcategory".
                err
        })
    }
}


//get all sub-categories
module.exports.subCategory = async function (req, res) {
    try {
        const { category } = req.body;
        const subcategory = await SubCategoryModel.find({ category }).populate('category');
        return res.status(200).send({
            success: true,
            message: "All SubCategories List",
            subcategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting all subcategories",
            error
        })
    }
}


//get a single sub-category
module.exports.singleSubCategory = async function (req, res) {
    try {
        const { slug } = req.params;
        const subCategory = await SubCategoryModel.findOne({ slug }).populate('category');
        if (subCategory) {
            return res.status(200).json({
                success: true,
                message: "get single subcategory successfully",
                subCategory
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
            message: "Error in getting single subcategory",
            error
        })
    }
}


//delete subcategory
module.exports.deleteSubCategory = async function (req, res) {
    try {
        const { id } = req.params;
        const category = await SubCategoryModel.findByIdAndDelete(id);
        if (category) {
            return res.status(200).json({
                success: true,
                message: "subcategory deleted successfully",
                category
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "no subcategory found to delete"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting subcategory",
            error
        })
    }
}