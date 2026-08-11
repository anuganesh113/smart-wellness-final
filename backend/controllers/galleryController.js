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

// @desc    Get a single gallery item by ID
// @route   GET /api/gallery/:id
// @access  Public
const getGalleryItemById = asyncHandler(async (req, res) => {
    const galleryItem = await Gallery.findById(req.params.id);

    if (galleryItem) {
        res.json(galleryItem);
    } else {
        res.status(404);
        throw new Error('Gallery item not found');
    }
});

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
const updateGalleryItem = asyncHandler(async (req, res) => {
    const { title, image, category, location, year, description } = req.body;

    const galleryItem = await Gallery.findById(req.params.id);

    if (galleryItem) {
        galleryItem.title = title || galleryItem.title;
        galleryItem.image = image || galleryItem.image;
        galleryItem.category = category || galleryItem.category;
        galleryItem.location = location !== undefined ? location : galleryItem.location;
        galleryItem.year = year !== undefined ? year : galleryItem.year;
        galleryItem.description = description !== undefined ? description : galleryItem.description;

        const updatedGalleryItem = await galleryItem.save();
        res.json(updatedGalleryItem);
    } else {
        res.status(404);
        throw new Error('Gallery item not found');
    }
});

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = asyncHandler(async (req, res) => {
    const galleryItem = await Gallery.findById(req.params.id);

    if (galleryItem) {
        await galleryItem.deleteOne();
        res.json({ message: 'Gallery item removed' });
    } else {
        res.status(404);
        throw new Error('Gallery item not found');
    }
});

module.exports = {
    getGallery,
    createGalleryItem,
    getGalleryItemById,
    updateGalleryItem,
    deleteGalleryItem,
};
