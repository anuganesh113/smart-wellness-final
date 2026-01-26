const asyncHandler = require('express-async-handler');
const Gallery = require('../models/galleryModel');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
const getGallery = asyncHandler(async (req, res) => {
    const gallery = await Gallery.find({});
    res.json(gallery);
});

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = asyncHandler(async (req, res) => {
    const { title, image, category, location, year, description } = req.body;

    const galleryItem = await Gallery.create({
        title,
        image,
        category,
        location,
        year,
        description,
    });

    if (galleryItem) {
        res.status(201).json(galleryItem);
    } else {
        res.status(400);
        throw new Error('Invalid gallery data');
    }
});

module.exports = {
    getGallery,
    createGalleryItem,
};
