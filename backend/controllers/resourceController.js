const express = require('express');
const ResourceModel = require('../models/ResourceModel');

// to create resource
module.exports.createResource = async function (req, res) {
    try {
        const { name, description, file } = req.body;
        if (!name) {
            return res.status(401).send({ error: "Name is Required" });
        }
        if (!description) {
            return res.status(401).send({ error: "Description is Required" });
        }
        if (!file) {
            return res.status(401).send({ error: "File is Required" });
        }

        const existingResource = await ResourceModel.findOne({ name });
        if (existingResource) {
            return res.status(200).send({
                success: true,
                message: "Resource already exists"
            })
        }

        const resource = await new ResourceModel({ name, description, file }).save();
        return res.status(201).json({
            success: true,
            message: "new resource created",
            resource
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in creating resource",
            err
        })
    }
}