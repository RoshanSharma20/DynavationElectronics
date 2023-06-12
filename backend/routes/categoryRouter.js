const express = require('express');
const { requireSignIn, isAuthorised } = require('../middlewares/authMiddleware');
const { createCategory, updateCategory, category, singleCategory, deleteCategory } = require('../controllers/categoryController');
const categoryRouter = express.Router();


//Routes
//Create Category
categoryRouter.post('/create-category', requireSignIn, isAuthorised, createCategory)

//Update Category
categoryRouter.put('/update-category/:id', requireSignIn, isAuthorised, updateCategory)

//getAll Category
categoryRouter.get('/get-category', category)

//single category
categoryRouter.get('/single-category/:slug', singleCategory)

//delete Category
categoryRouter.delete('/delete-category/:id', requireSignIn, isAuthorised, deleteCategory)

module.exports = categoryRouter;