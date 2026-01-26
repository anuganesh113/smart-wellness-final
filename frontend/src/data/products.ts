import saunaImage from '@/assets/sauna-product.jpg';
import steamImage from '@/assets/steam-room.jpg';
import jacuzziImage from '@/assets/jacuzzi.jpg';
import accessoriesImage from '@/assets/accessories.jpg';

export interface Product {
    id: string;
    name: string;
    tagline: string;
    price: string;
    description: {
        overview: string;
        benefits: string[];
    };
    features: string[];
    specs: {
        label: string;
        value: string;
    }[];
    images: string[];
    category: 'sauna' | 'steam' | 'jacuzzi' | 'accessories';
}

export const products: Product[] = [
    {
        id: 'saunas',
        name: 'Finnish Luxury Sauna',
        tagline: 'Experience the authentic warmth of tradition.',
        price: 'Rs. 3,50,000',
        description: {
            overview: 'Our handcrafted Finnish saunas bring the timeless tradition of Nordic wellness into your home. Built with premium Canadian Hemlock or Western Red Cedar, these saunas provide a sanctuary of relaxation, promoting detoxification, improved circulation, and stress relief.',
            benefits: [
                'Detoxification through deep sweating',
                'Improved cardiovascular health',
                'Stress reduction and better sleep',
                'Relief from muscle and joint pain'
            ]
        },
        features: ['Canadian Hemlock Wood', 'Low-EMF Heaters', 'Tempered Glass Door', 'Chromotherapy Lighting'],
        specs: [
            { label: 'Dimensions', value: '150cm x 150cm x 200cm' },
            { label: 'Capacity', value: '3-4 People' },
            { label: 'Heater', value: '6kW Harvia Heater' },
            { label: 'Control', value: 'Digital Touch Panel' },
            { label: 'Material', value: 'Grade A Hemlock / Cedar' }
        ],
        images: [saunaImage],
        category: 'sauna'
    },
    {
        id: 'steam',
        name: 'Crystal Steam Room',
        tagline: 'Rejuvenate your senses with pure steam therapy.',
        price: 'Rs. 2,50,000',
        description: {
            overview: 'Transform your bathroom into a private spa with our Crystal Steam Rooms. Featuring advanced steam generation technology and ergonomic seating, our steam rooms offer a humid, soothing environment perfect for respiratory health and skin rejuvenation.',
            benefits: [
                'Cleanses and hydrates the skin',
                'Relieves respiratory congestion',
                'Relaxes stiff joints and muscles',
                'Promotes deep relaxation'
            ]
        },
        features: ['Quick-Start Steam Generator', 'Aromatherapy Oil Cup', 'Ventilation Fan', 'Bluetooth Audio System'],
        specs: [
            { label: 'Dimensions', value: 'Custom Sizes Available' },
            { label: 'Generator', value: '9kW Quick-Steam' },
            { label: 'Material', value: 'Acrylic & Tempered Glass' },
            { label: 'Control', value: 'Waterproof Touch Interface' },
            { label: 'Lighting', value: 'RGB Mood Lighting' }
        ],
        images: [steamImage],
        category: 'steam'
    },
    {
        id: 'jacuzzis',
        name: 'HydroSmart Jacuzzi',
        tagline: 'The ultimate hydrotherapy experience.',
        price: 'Rs. 2,50,000',
        description: {
            overview: 'Immerse yourself in luxury with our HydroSmart Jacuzzis. Engineered with powerful hydro-massage jets and ergonomic seating, this hot tub melts away tension and reinvigorates your body. Perfect for both indoor and outdoor installation.',
            benefits: [
                'Targeted hydro-massage for pain relief',
                'Buoyancy reduces pressure on joints',
                'Warm water improves circulation',
                'Social relaxation for family and friends'
            ]
        },
        features: ['50+ Hydro Jets', 'Ozone Water Purification', 'Waterfall Feature', 'Smart App Control'],
        specs: [
            { label: 'Dimensions', value: '220cm x 220cm x 90cm' },
            { label: 'Capacity', value: '5-6 Adults' },
            { label: 'Jets', value: '52 Stainless Steel Jets' },
            { label: 'Water Capacity', value: '1,200 Liters' },
            { label: 'Pump', value: '2 x 3HP High Performance' }
        ],
        images: [jacuzziImage],
        category: 'jacuzzi'
    },
    {
        id: 'accessories',
        name: 'Premium Spa Accessories',
        tagline: 'Complete your wellness sanctuary.',
        price: 'From Rs. 5000',
        description: {
            overview: 'Elevate your sauna or steam experience with our curated collection of premium accessories. From authentic wooden buckets and ladles to essential oils and ergonomic backrests, every item is designed to enhance comfort and style.',
            benefits: [
                'Enhances the authenticity of the experience',
                'Increases comfort and safety',
                'Aromatherapy options for sensory delight',
                'Durable materials built for high heat/humidity'
            ]
        },
        features: ['Hand-Carved Wood', 'Pure Essential Oils', 'Heat-Resistant Materials', 'Ergonomic Design'],
        specs: [
            { label: 'Material', value: 'Pine, Cedar, Copper' },
            { label: 'Origin', value: 'Imported from Finland' },
            { label: 'Warranty', value: '1 Year' },
            { label: 'Compatibility', value: 'Universal' }
        ],
        images: [accessoriesImage],
        category: 'accessories'
    }
];
