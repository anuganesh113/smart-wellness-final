const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category', 'name');
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        slug,
        price,
        images,
        category,
        shortDescription,
        longDescription,
        specifications,
        isFeatured,
        features,
        keyHighlights
    } = req.body;

    console.log('Create Product Body:', req.body); // Debug log

    const productData = {
        name,
        slug: slug ? slug.trim() : slug,
        price,
        // user: req.user._id, // User field does not exist in schema
        images,
        category,
        shortDescription,
        longDescription,
        specifications,
        isFeatured,
        features,
        keyHighlights
    };

    // Remove undefined fields
    Object.keys(productData).forEach(key => productData[key] === undefined && delete productData[key]);

    const product = new Product(productData);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        slug,
        price,
        description,
        images,
        category,
        shortDescription,
        longDescription,
        specifications,
        isFeatured,
        keyHighlights
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.slug = slug ? slug.trim() : product.slug;
        product.price = price || product.price;
        product.images = images || product.images;
        product.category = category || product.category;
        product.shortDescription = shortDescription || product.shortDescription;
        product.longDescription = longDescription || product.longDescription;
        product.specifications = specifications || product.specifications;
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.features = req.body.features || product.features;
        product.keyHighlights = keyHighlights || product.keyHighlights;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getProducts,
    getProductBySlug,
    deleteProduct,
    createProduct,
    updateProduct,
};
