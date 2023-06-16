const express = require('express');
const { requireSignIn, isAuthorised } = require('../middlewares/authMiddleware');
const { createResource } = require('../controllers/resourceController');
const resourceRouter = express.Router();


// create resource
resourceRouter.post('/create-resource', createResource)

// //Update Category
// categoryRouter.put('/update-resource/:id', requireSignIn, isAuthorised, updateCategory)

// //getAll Category
// categoryRouter.get('/get-resource', category)

// //single category
// categoryRouter.get('/single-resource/:slug', singleCategory)

// //delete Category
// categoryRouter.delete('/delete-resource/:id', requireSignIn, isAuthorised, deleteCategory)

module.exports = resourceRouter;