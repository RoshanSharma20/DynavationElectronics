const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'categoryModel',
        required: true
    },
    slug: {
        type: String,
        lowercase: true
    }
})

const SubCategoryModel = mongoose.model('subCategoryModel', subCategorySchema);
module.exports = SubCategoryModel;