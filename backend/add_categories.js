const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

const categoriesToAdd = [
    { name: 'Sauna', slug: 'sauna' },
    { name: 'Jacuzzi', slug: 'jacuzzi' },
    { name: 'Accessories', slug: 'accessories' }
];

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const Category = require('./models/categoryModel');

        for (const cat of categoriesToAdd) {
            await Category.findOneAndUpdate(
                { slug: cat.slug },
                cat,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`Ensured category: ${cat.name}`);
        }

        console.log('Categories added successfully.');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
