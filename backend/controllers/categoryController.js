const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name, slug, image, description } = req.body;

    const category = await Category.create({
        name,
        slug,
        image,
        description,
    });

    if (category) {
        res.status(201).json(category);
    } else {
        res.status(400);
        throw new Error('Invalid category data');
    }
});

module.exports = {
    getCategories,
    createCategory,
};
