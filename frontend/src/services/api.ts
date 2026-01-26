import { products, categories, gallery, testimonials } from '../data/staticData';

// Mock API for static hosting
export const getProducts = async () => {
    return products;
};

export const getProductBySlug = async (slug: string) => {
    return products.find(p => p.slug === slug);
};

export const createInquiry = async (inquiryData: any) => {
    console.log('Inquiry submitted (static mode):', inquiryData);
    return { message: 'Inquiry received' };
};

export const getGallery = async () => {
    const productItems = products.map(p => ({
        _id: p.id,
        title: p.name,
        image: p.images[0],
        category: typeof p.category === 'object' ? p.category.name : p.category,
        location: 'Showroom',
        year: '2024',
        description: p.shortDescription
    }));

    const galleryItems = gallery.map(g => ({
        _id: g.id,
        title: g.title,
        image: g.imageUrl,
        category: g.category,
        location: 'Project Location',
        year: g.year,
        description: g.description
    }));

    return [...productItems, ...galleryItems];
};

export const getTestimonials = async () => {
    return testimonials;
};

export const getCategories = async () => {
    return categories;
};

export const uploadImage = async (formData: FormData) => {
    console.log('Image upload (static mode)');
    return { path: 'https://images.unsplash.com/photo-1543489822-c49534f3271f' };
};

export const createProduct = async (productData: any) => {
    console.log('Create product (static mode):', productData);
    return productData;
};

export const updateProduct = async (id: string, productData: any) => {
    console.log('Update product (static mode):', id, productData);
    return productData;
};

export const createGalleryItem = async (galleryData: any) => {
    console.log('Create gallery item (static mode):', galleryData);
    return galleryData;
};

export default {
    getProducts,
    getProductBySlug,
    createInquiry,
    getGallery,
    getTestimonials,
    getCategories,
    uploadImage,
    createProduct,
    updateProduct,
    createGalleryItem
};

