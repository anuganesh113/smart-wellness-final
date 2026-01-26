import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { createGalleryItem, uploadImage } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Loader2, Save } from 'lucide-react';

const categories = ['Residential', 'Commercial', 'Outdoor'];

const AdminGalleryForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        category: 'Residential',
        location: '',
        year: '2024',
        description: '',
        image: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;

            // 1. Upload new image if selected
            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', imageFile);
                const uploadRes = await uploadImage(uploadFormData);
                imageUrl = uploadRes; // API returns string path directly
            }

            if (!imageUrl) {
                toast({ title: 'Please select an image', variant: 'destructive' });
                setLoading(false);
                return;
            }

            // 2. Create Gallery Item
            await createGalleryItem({
                ...formData,
                image: imageUrl,
            });

            toast({ title: 'Gallery Item Created Successfully' });
            navigate('/admin/dashboard');

        } catch (error: any) {
            console.error(error);
            toast({
                title: 'Error creating item',
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
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all" onClick={() => navigate('/admin/dashboard')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>

                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border bg-muted/20">
                        <h1 className="text-2xl font-bold font-display">Add Gallery Item</h1>
                        <p className="text-muted-foreground mt-1">Showcase a new project in your portfolio</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Image Upload Section */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Project Image</label>

                            <div className={`relative aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center transition-all bg-muted/30 ${!previewUrl ? 'hover:border-primary/50 hover:bg-muted/50' : ''}`}>
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => { setImageFile(null); setPreviewUrl(null); }}
                                            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur-sm transition-colors"
                                        >
                                            <Upload className="w-4 h-4 rotate-45" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <Upload className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm font-medium">Click to upload an image</p>
                                        <p className="text-xs text-muted-foreground mt-2">Recommended: 1200x800px or larger</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Title */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Modern Glass Sauna"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Marin County, CA"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {/* Year */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Year</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2024"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Category</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {categories.map((cat) => (
                                        <button
                                            type="button"
                                            key={cat}
                                            onClick={() => setFormData({ ...formData, category: cat })}
                                            className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${formData.category === cat
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Description</label>
                            <textarea
                                required
                                placeholder="Describe the project..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px]"
                            />
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-border flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/admin/dashboard')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="gold" disabled={loading} className="min-w-[150px]">
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                ) : (
                                    <><Save className="w-4 h-4 mr-2" /> Add Project</>
                                )}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AdminGalleryForm;
