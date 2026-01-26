const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        shortDescription: {
            type: String,
            required: true,
        },
        longDescription: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: [
            {
                type: String, // URL or path to image
            },
        ],
        specifications: [
            {
                key: String,
                value: String,
            },
        ],
        features: [String],
        keyHighlights: [
            {
                title: String,
                description: String,
                icon: String,
            }
        ],
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
