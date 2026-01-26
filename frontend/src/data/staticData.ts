import royalSaunaImg from '../assets/royal.png';
import jacuzziImg from '../assets/jacuzzi.jpg';
import cornerSpaImg from '../assets/jacuzzi.png';
import arcticMistImg from '../assets/gallery-3.jpg';

export const categories = [
    { id: 'cat1', name: 'Saunas', slug: 'saunas', description: 'Traditional and Infrared Saunas' },
    { id: 'cat2', name: 'Steam Rooms', slug: 'steam-rooms', description: 'Luxury Steam Rooms' },
    { id: 'cat3', name: 'Jacuzzis', slug: 'jacuzzis', description: 'Relaxing Jacuzzis' },
];

export const products = [
    {
        id: 'prod1',
        name: 'Royal Cedar Barrel Sauna',
        slug: 'royal-cedar-barrel-sauna',
        category: { name: 'Saunas' },
        shortDescription: 'Outdoor barrel sauna for 4-6 people.',
        longDescription: 'Handcrafted from premium Western Red Cedar wood, this royal barrel sauna offers exceptional heat distribution and a stunning aesthetic for your outdoor space. Featuring a high-grade Harvia heater and panoramic view window.',
        price: 5200,
        images: [royalSaunaImg],
        features: ['Premium Red Cedar', 'Tempered Glass Door', 'Harvia 8kW Heater', 'LED Ambient Lighting'],
        isFeatured: true,
    },
    {
        id: 'prod2',
        name: 'Modern Glass Panorama Sauna',
        slug: 'modern-glass-panorama-sauna',
        category: { name: 'Saunas' },
        shortDescription: 'Indoor minimalist sauna with full glass frontage.',
        longDescription: 'A masterpiece of modern design, this indoor sauna features floor-to-ceiling tempered glass and minimalist benches. Perfect for contemporary home wellness suites.',
        price: 6800,
        images: ['https://images.unsplash.com/photo-1543489822-c49534f3271f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
        features: ['Frameless Glass', 'Canadian Hemlock Wood', 'Touch Control Panel', 'Bluetooth Sound System'],
        isFeatured: true,
    },
    {
        id: 'prod3',
        name: 'Elite Steam Sanctuary',
        slug: 'elite-steam-sanctuary',
        category: { name: 'Steam Rooms' },
        shortDescription: 'Professional-grade steam cabin for home use.',
        longDescription: 'Transform your bathroom into a luxury spa with the Elite Steam Sanctuary. Features high-density steam generation and chromotherapy lighting for the ultimate detox session.',
        price: 4200,
        images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
        features: ['Quick-Steam Tech', 'Anti-Fog Glass', 'Digital Thermostat', 'Aromatherapy Dispenser'],
        isFeatured: false,
    },
    {
        id: 'prod4',
        name: 'Arctic Mist Steam Room',
        slug: 'arctic-mist-steam-room',
        category: { name: 'Steam Rooms' },
        shortDescription: 'Large capacity steam room with mosaic tiling.',
        longDescription: 'Designed for groups, the Arctic Mist features beautiful mosaic tile designs and multiple ergonomic seating levels. Engineered for consistent heat and humidity.',
        price: 7500,
        images: [arcticMistImg],
        features: ['Italian Mosaics', 'High-Output Generator', 'Integrated Drainage', 'Mist Cooling System'],
        isFeatured: true,
    },
    {
        id: 'prod5',
        name: 'Azure Infinity Jacuzzi',
        slug: 'azure-infinity-jacuzzi',
        category: { name: 'Jacuzzis' },
        shortDescription: 'Luxurious infinity edge hot tub for 4 people.',
        longDescription: 'Relax in style with the Azure Infinity Jacuzzi. Its unique overflow design creates a seamless water surface, while 32 adjustable jets provide a deep tissue massage experience.',
        price: 8900,
        images: [jacuzziImg],
        features: ['Infinity Edge', '32 Hydro-Jets', 'UV-C Purification', 'Waterfall Feature'],
        isFeatured: true,
    },
    {
        id: 'prod6',
        name: 'Serene Corner Spa',
        slug: 'serene-corner-spa',
        category: { name: 'Jacuzzis' },
        shortDescription: 'Compact corner jacuzzi perfect for small patios.',
        longDescription: 'The Serene Corner Spa offers the full jacuzzi experience in a space-saving design. Includes ergonomic seating and whisper-quiet operation.',
        price: 3800,
        images: [cornerSpaImg],
        features: ['Space-Saving Design', 'Silent-Run Pump', 'LED Mood Lights', 'Built-in Cup Holders'],
        isFeatured: false,
    }
];

export const gallery = [
    {
        id: 'gal1',
        title: 'Luxury Sauna Installation',
        imageUrl: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'Saunas',
        year: 2023,
        description: 'A beautiful barrel sauna installed in a private residence.'
    },
    {
        id: 'gal2',
        title: 'Modern Jacuzzi Setup',
        imageUrl: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        category: 'Jacuzzis',
        year: 2024,
        description: 'A sleek jacuzzi designed for ultimate relaxation.'
    }
];

export const testimonials = [
    {
        id: 'test1',
        name: 'John Doe',
        role: 'Homeowner',
        content: 'The quality of the sauna is exceptional. It has transformed my backyard into a personal spa.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?u=john'
    },
    {
        id: 'test2',
        name: 'Jane Smith',
        role: 'Wellness Enthusiast',
        content: 'Amazing service and top-notch products. Highly recommend Smart Wellness for anyone looking for luxury.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?u=jane'
    }
];
