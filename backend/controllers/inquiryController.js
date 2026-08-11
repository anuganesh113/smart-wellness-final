const asyncHandler = require('express-async-handler');
const Inquiry = require('../models/inquiryModel');
const sendEmail = require('../utils/sendEmail');

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
        // Send email notification locally
        try {
            const emailMessage = `
                <h2>New Consultation Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Project Type:</strong> ${productRef}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `;

            await sendEmail({
                email: 'cbschandrashrestha@gmail.com',
                subject: 'New Smart Wellness Inquiry',
                html: emailMessage
            });
            console.log('Email notification sent');
        } catch (error) {
            console.error('Email send failed:', error);
            // Don't fail the request if email fails, just log it
        }

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
