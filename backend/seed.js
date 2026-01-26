import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();

        // Create Admin User
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash('123456', salt);

        const adminUser = await User.create({
            username: 'admin',
            password: '123456', // Pass plain text, model handles hashing
            role: 'admin',
        });

        console.log(`Admin User Created: username: admin, password: 123456`.green.inverse);

        // Create Categories
        const categories = await Category.insertMany([
            { name: 'Saunas', slug: 'saunas', description: 'Traditional and Infrared Saunas' },
            { name: 'Steam Rooms', slug: 'steam-rooms', description: 'Luxury Steam Rooms' },
            { name: 'Jacuzzis', slug: 'jacuzzis', description: 'Relaxing Jacuzzis' },
        ]);

        console.log('Categories Imported!'.green.inverse);

        // Create Sample Product
        const sampleProduct = {
            name: 'Luxury Barrel Sauna',
            slug: 'luxury-barrel-sauna',
            category: categories[0]._id, // First category (Saunas)
            shortDescription: 'Outdoor barrel sauna for 4 people.',
            longDescription: 'Handcrafted from premium cedar wood, this barrel sauna offers exceptional heat distribution and a stunning aesthetic for your backyard.',
            price: 4500,
            images: ['https://images.unsplash.com/photo-1543489822-c49534f3271f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
            features: ['Cedar Wood', 'Tempered Glass', 'Harvia Heater'],
            isFeatured: true,
        };

        await Product.create(sampleProduct);

        console.log('Sample Product Imported!'.green.inverse);

        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
