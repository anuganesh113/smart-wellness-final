import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getCategories, getProductBySlug, uploadImage, createProduct, updateProduct } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, X } from 'lucide-react';

const AdminProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditMode = !!id;

    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        price: '',
        category: '',
        shortDescription: '',
        longDescription: '',
        images: [] as string[],
        features: [''],
        keyHighlights: [] as { title: string; description: string; icon: string }[],
        specifications: [] as { key: string; value: string }[],
        isFeatured: false,
    });

    useEffect(() => {
        fetchCategories();
        if (isEditMode) {
            fetchProductData();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories');
        }
    };

    const fetchProductData = async () => {
        try {
            const data = await getProductBySlug(id!);
            setFormData({
                name: data.name,
                slug: data.slug,
                price: data.price.toString(),
                category: data.category?._id || data.category,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription,
                images: data.images,
                features: data.features.length ? data.features : [''],
                keyHighlights: data.keyHighlights || [],
                specifications: data.specifications || [],
                isFeatured: data.isFeatured,
            });
        } catch (error) {
            toast({ title: 'Error fetching product details', variant: 'destructive' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Features Logic
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };
    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };
    const removeFeature = (index: number) => {
        setFormData(prev => ({ ...prev, features: formData.features.filter((_, i) => i !== index) }));
    };

    // Specifications Logic
    const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index] = { ...newSpecs[index], [field]: val };
        setFormData(prev => ({ ...prev, specifications: newSpecs }));
    };
    const addSpec = () => {
        setFormData(prev => ({ ...prev, specifications: [...prev.specifications, { key: '', value: '' }] }));
    };
    const removeSpec = (index: number) => {
        setFormData(prev => ({ ...prev, specifications: prev.specifications.filter((_, i) => i !== index) }));
    };


    // Image Logic
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploading(true);
        const data = new FormData();
        data.append('image', files[0]);

        try {
            const res = await uploadImage(data);
            setFormData(prev => ({ ...prev, images: [...prev.images, res] }));
            toast({ title: 'Image Uploaded' });
        } catch (error) {
            toast({ title: 'Image upload failed', variant: 'destructive' });
        } finally {
            setUploading(false);
        }
    };
    const removeImage = (index: number) => {
        setFormData(prev => ({ ...prev, images: formData.images.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const finalData = {
                ...formData,
                name: formData.name.trim(),
                slug: formData.slug.trim()
            };

            if (isEditMode) {
                const productToUpdate = await getProductBySlug(id!);
                await updateProduct(productToUpdate._id, finalData);
                toast({ title: 'Product Updated' });
            } else {
                await createProduct(finalData);
                toast({ title: 'Product Created' });
            }
            navigate('/admin/dashboard');
        } catch (error: any) {
            toast({
                title: `Error ${isEditMode ? 'updating' : 'creating'} product`,
                description: error.response?.data?.message || 'Something went wrong',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-32 max-w-3xl">
                <Button variant="ghost" className="mb-6" onClick={() => navigate('/admin/dashboard')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>

                <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                    <h1 className="text-2xl font-bold mb-8 font-display">
                        {isEditMode ? 'Edit Product' : 'Add New Product'}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Price */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Product Name</label>
                                <Input name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Price (Number)</label>
                                <Input name="price" type="number" value={formData.price} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Slug & Category */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Slug (URL identifier)</label>
                                <Input name="slug" value={formData.slug} onChange={handleChange} required placeholder="e.g. luxury-sauna" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Short Description</label>
                            <Input name="shortDescription" value={formData.shortDescription} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Long Description</label>
                            <Textarea name="longDescription" value={formData.longDescription} onChange={handleChange} className="h-32" required />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Images</label>
                            <div className="flex flex-wrap gap-4 mb-4">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative w-24 h-24 rounded-md overflow-hidden group">
                                        <img src={img} alt="Product" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                <label className="w-24 h-24 border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 transition-colors">
                                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                                    <span className="text-xs text-muted-foreground">Upload</span>
                                    <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                            </div>
                            {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Features</label>
                            <div className="space-y-3">
                                {formData.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input value={feature} onChange={(e) => handleFeatureChange(idx, e.target.value)} />
                                        <Button type="button" variant="outline" size="icon" onClick={() => removeFeature(idx)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addFeature}>+ Add Feature</Button>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Specifications</label>
                            <div className="space-y-3">
                                {formData.specifications.map((spec, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input placeholder="Key (e.g. Dimensions)" value={spec.key} onChange={(e) => handleSpecChange(idx, 'key', e.target.value)} />
                                        <Input placeholder="Value (e.g. 200x200cm)" value={spec.value} onChange={(e) => handleSpecChange(idx, 'value', e.target.value)} />
                                        <Button type="button" variant="outline" size="icon" onClick={() => removeSpec(idx)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addSpec}>+ Add Specification</Button>
                            </div>
                        </div>


                        {/* Submit */}
                        <div className="pt-4">
                            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
                                {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AdminProductForm;
