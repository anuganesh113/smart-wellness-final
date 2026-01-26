const asyncHandler = require('express-async-handler');
const Inquiry = require('../models/inquiryModel');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = asyncHandler(async (req, res) => {
    const { name, email, phone, message, productRef } = req.body;

    const inquiry = await Inquiry.create({
        name,
        email,
        phone,
        message,
        productRef,
    });

    if (inquiry) {
        res.status(201).json(inquiry);
    } else {
        res.status(400);
        throw new Error('Invalid inquiry data');
    }
});

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
const getInquiries = asyncHandler(async (req, res) => {
    const inquiries = await Inquiry.find({}).sort({ date: -1 });
    res.json(inquiries);
});

module.exports = {
    createInquiry,
    getInquiries,
};
