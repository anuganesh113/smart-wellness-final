const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const Category = require('./models/categoryModel');

        const result = await Category.deleteMany({ slug: { $in: ['saunas', 'jacuzzis', 'steam-rooms', 'accessories'] } });
        console.log(`Deleted ${result.deletedCount} categories.`);

        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
