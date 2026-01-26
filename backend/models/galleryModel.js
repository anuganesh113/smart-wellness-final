const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String, // e.g., 'Saunas', 'Jacuzzis'
            required: true,
        },
        location: {
            type: String,
            required: false,
            default: '',
        },
        year: {
            type: String,
            required: false,
            default: '2024',
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
