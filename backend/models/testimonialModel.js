const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        image: {
            type: String, // User avatar or photo
        },
    },
    {
        timestamps: true,
    }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
