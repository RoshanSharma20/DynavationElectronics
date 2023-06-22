const express = require('express');
const { requireSignIn, isAuthorised } = require('../middlewares/authMiddleware');
const { createSubCategory, updateSubCategory, subCategory, singleSubCategory, deleteSubCategory } = require('../controllers/subCategoryController');
const subCategoryRouter = express.Router();

//Routes
//Create subCategory
subCategoryRouter.post('/create-subCategory', requireSignIn, isAuthorised, createSubCategory)

//Update Category
subCategoryRouter.put('/update-subCategory/:id', requireSignIn, isAuthorised, updateSubCategory)

//getAll Category
subCategoryRouter.get('/get-subCategory', subCategory)

//single category
subCategoryRouter.get('/single-subCategory/:slug', singleSubCategory)

//delete Category
subCategoryRouter.delete('/delete-subCategory/:id', requireSignIn, isAuthorised, deleteSubCategory)

module.exports = subCategoryRouter;