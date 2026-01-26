const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        message: {
            type: String,
            required: true,
        },
        productRef: {
            type: String, // Can be Product Name or ID if specific
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
