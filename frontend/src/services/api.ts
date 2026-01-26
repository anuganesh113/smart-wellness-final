import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductBySlug = async (slug: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
};

export const createInquiry = async (inquiryData: any) => {
    const response = await api.post('/inquiries', inquiryData);
    return response.data;
};

export const getGallery = async () => {
    const response = await api.get('/gallery');
    return response.data;
};

export const getTestimonials = async () => {
    const response = await api.get('/testimonials');
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const uploadImage = async (formData: FormData) => {
    const response = await api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data; // Expected to return string path or object with path
};

export const createProduct = async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

export const createGalleryItem = async (galleryData: any) => {
    const response = await api.post('/gallery', galleryData);
    return response.data;
};

export default api;
