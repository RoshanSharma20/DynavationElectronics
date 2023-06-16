const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
