const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI not found in .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('Connected to MongoDB');
        const Product = mongoose.model('Product', new mongoose.Schema({ name: String, slug: String }));
        const products = await Product.find({});
        console.log('--- PRODUCTS START ---');
        console.log(JSON.stringify(products, null, 2));
        console.log('--- PRODUCTS END ---');
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection Error:', err);
        process.exit(1);
    });
