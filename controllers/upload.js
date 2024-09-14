const path = require('path');
const fs = require('fs');
const { helperUploadFile } = require('../helpers');
const { User, Product } = require('../models');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async (req, res) => {
    try {
        // const fileName = await helperUploadFile(req.files, ['txt', 'md'], 'texts');
        const fileName = await helperUploadFile(req.files, undefined, 'imgs');
        res.json({
            msg: 'File uploaded successfully',
            fileName
        });
    } catch (msg) {
        res.status(400).json({msg});
    }
    
}

const updateImage = async (req, res) => {
    const { id, collection } = req.params;
    
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({msg: 'User not found'});
                return;
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({msg: 'Product not found'});
                return;
            }
            break;
        default:
            res.status(500).json({msg: 'This collection is not supported'});
    }

    // Delete previous image
    if (model.picture) {
        const pathImage = path.join(__dirname, '../uploads/', collection, model.picture);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    const fileName = await helperUploadFile(req.files, undefined, collection);
    model.picture = fileName;
    await model.save();

    res.json({
        msg: 'Image updated successfully'
    });
}

const getImage = async (req, res) => {
    const { id, collection } = req.params;
    
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({msg: 'User not found'});
                return;
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({msg: 'Product not found'});
                return;
            }
            break;
        default:
            res.status(500).json({msg: 'This collection is not supported'});
            return;
    }

    // Get image
    if (model.picture) {
        return res.redirect(model.picture);
    } else {
        const pathImage = path.join(__dirname, '../assets/no-image.jpg');
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        } else {
            return res.status(404).json({msg: 'Image not found'});
        }
    }
}

const updateImageCloudinary = async (req, res) => {
    const { id, collection } = req.params;
    
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({msg: 'User not found'});
                return;
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({msg: 'Product not found'});
                return;
            }
            break;
        default:
            res.status(500).json({msg: 'This collection is not supported'});
    }

    // Delete previous image
    if (model.picture) {
        const nameArr = model.picture.split('/');
        const name = nameArr[nameArr.length - 1];
        const [publicId] = name.split('.');
        await cloudinary.uploader.destroy(publicId);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.picture = secure_url;
    await model.save();

    res.json({
        msg: 'Image updated successfully'
    });
}


module.exports = {
    uploadFile,
    updateImage,
    getImage,
    updateImageCloudinary
}