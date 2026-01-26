const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(async () => {
        const Product = mongoose.model('Product', new mongoose.Schema({ name: String, slug: String, images: [String] }));
        const products = await Product.find({});

        for (const product of products) {
            let changed = false;

            // Trim slug
            if (product.slug && product.slug !== product.slug.trim()) {
                console.log(`Fixing slug for ${product.name}: [${product.slug}] -> [${product.slug.trim()}]`);
                product.slug = product.slug.trim();
                changed = true;
            }

            // Fix backslashes in images
            if (product.images && product.images.length > 0) {
                const newImages = product.images.map(img => img.replace(/\\/g, '/'));
                if (JSON.stringify(newImages) !== JSON.stringify(product.images)) {
                    console.log(`Fixing image paths for ${product.name}`);
                    product.images = newImages;
                    changed = true;
                }
            }

            if (changed) {
                await product.save();
            }
        }

        console.log('Cleanup complete');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
