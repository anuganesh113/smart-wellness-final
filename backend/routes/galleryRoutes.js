const express = require('express');
const router = express.Router();
const {
    getGallery,
    createGalleryItem,
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getGallery).post(protect, admin, createGalleryItem);

module.exports = router;
