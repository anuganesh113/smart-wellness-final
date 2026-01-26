const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/testimonialModel');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = asyncHandler(async (req, res) => {
    const { name, review, rating, image } = req.body;

    const testimonial = await Testimonial.create({
        name,
        review,
        rating,
        image,
    });

    if (testimonial) {
        res.status(201).json(testimonial);
    } else {
        res.status(400);
        throw new Error('Invalid testimonial data');
    }
});

module.exports = {
    getTestimonials,
    createTestimonial,
};
