import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';
import { 
    getProducts, 
    getGallery, 
    deleteGalleryItem, 
    getInquiries, 
    deleteInquiry, 
    getCategories, 
    createCategory, 
    deleteCategory, 
    getImageUrl 
} from '@/services/api';
import api from '@/services/api';
import { Plus, Trash, Edit, Image as ImageIcon, MessageSquare, Tag, FolderOpen, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'products' | 'gallery' | 'inquiries' | 'categories'>('products');
    const navigate = useNavigate();
    const { toast } = useToast();

    // Category Creation State
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategorySlug, setNewCategorySlug] = useState('');
    const [newCategoryDesc, setNewCategoryDesc] = useState('');
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchGalleryItems();
        fetchInquiries();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    const fetchGalleryItems = async () => {
        try {
            const data = await getGallery();
            setGalleryItems(data);
        } catch (error) {
            console.error('Failed to fetch gallery items', error);
        }
    };

    const fetchInquiries = async () => {
        try {
            const data = await getInquiries();
            setInquiries(data);
        } catch (error) {
            console.error('Failed to fetch inquiries', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    const deleteProduct = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter((p) => p._id !== id));
                toast({ title: 'Product Deleted' });
            } catch (error) {
                toast({ title: 'Error deleting product', variant: 'destructive' });
            }
        }
    };

    const handleDeleteGalleryItem = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this gallery item?')) {
            try {
                await deleteGalleryItem(id);
                setGalleryItems(galleryItems.filter((item) => item._id !== id));
                toast({ title: 'Gallery Item Deleted' });
            } catch (error) {
                toast({ title: 'Error deleting gallery item', variant: 'destructive' });
            }
        }
    };

    const handleDeleteInquiry = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await deleteInquiry(id);
                setInquiries(inquiries.filter((item) => item._id !== id));
                toast({ title: 'Inquiry Deleted' });
            } catch (error) {
                toast({ title: 'Error deleting inquiry', variant: 'destructive' });
            }
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category? Products linked to this category may fail to render correctly.')) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter((cat) => cat._id !== id));
                toast({ title: 'Category Deleted' });
            } catch (error) {
                toast({ title: 'Error deleting category', variant: 'destructive' });
            }
        }
    };

    const handleCreateCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim() || !newCategorySlug.trim()) {
            toast({ title: 'Name and slug are required', variant: 'destructive' });
            return;
        }

        setIsCreatingCategory(true);
        try {
            const newCat = await createCategory({
                name: newCategoryName.trim(),
                slug: newCategorySlug.trim().toLowerCase().replace(/\s+/g, '-'),
                description: newCategoryDesc.trim(),
            });
            setCategories([...categories, newCat]);
            setNewCategoryName('');
            setNewCategorySlug('');
            setNewCategoryDesc('');
            toast({ title: 'Category Created successfully' });
        } catch (error: any) {
            toast({
                title: 'Error creating category',
                description: error.response?.data?.message || 'Something went wrong',
                variant: 'destructive',
            });
        } finally {
            setIsCreatingCategory(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-bold font-display tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage products, customer requests, showcase gallery, and categories.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
                        <Button asChild variant="gold" size="sm">
                            <Link to="/admin/gallery/new"><ImageIcon className="w-4 h-4 mr-2" /> Add Gallery Item</Link>
                        </Button>
                        <Button asChild variant="gold" size="sm">
                            <Link to="/admin/product/new"><Plus className="w-4 h-4 mr-2" /> Add Product</Link>
                        </Button>
                    </div>
                </div>

                {/* Dashboard Tabs Selector */}
                <div className="flex border-b border-border mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {[
                        { id: 'products', label: 'Products', icon: FolderOpen },
                        { id: 'gallery', label: 'Gallery Items', icon: ImageIcon },
                        { id: 'inquiries', label: 'Customer Inquiries', icon: MessageSquare },
                        { id: 'categories', label: 'Categories', icon: Tag },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'border-gold text-gold bg-gold/5 font-semibold'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                                {tab.id === 'inquiries' && inquiries.length > 0 && (
                                    <span className="ml-1.5 px-2 py-0.5 text-xs bg-gold text-charcoal rounded-full font-bold">
                                        {inquiries.length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border bg-muted/20">
                            <h2 className="text-xl font-semibold">Active Products ({products.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-muted/5">
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border">
                                                    <img src={getImageUrl(product.images?.[0] || '')} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold">{product.name}</div>
                                                <div className="text-xs text-muted-foreground font-mono mt-0.5">{product.slug}</div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gold">NPR. {product.price?.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 bg-muted text-foreground text-xs rounded-full border border-border">
                                                    {product.category?.name || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Button size="sm" variant="ghost" asChild>
                                                    <Link to={`/admin/product/${product.slug}/edit`}><Edit className="w-4 h-4" /></Link>
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteProduct(product._id)}>
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                                No products found. Add a product to get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* GALLERY TAB */}
                {activeTab === 'gallery' && (
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border bg-muted/20">
                            <h2 className="text-xl font-semibold">Gallery Showcase ({galleryItems.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {galleryItems.map((item) => (
                                        <tr key={item._id} className="hover:bg-muted/5">
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border">
                                                    <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold">{item.title}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 bg-muted text-foreground text-xs rounded-full border border-border">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">{item.location || '-'}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Button size="sm" variant="ghost" asChild>
                                                    <Link to={`/admin/gallery/${item._id}/edit`}><Edit className="w-4 h-4" /></Link>
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDeleteGalleryItem(item._id)}>
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {galleryItems.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                                No gallery items found. Showcase a project to get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* INQUIRIES TAB */}
                {activeTab === 'inquiries' && (
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border bg-muted/20">
                            <h2 className="text-xl font-semibold">Client Consultations & Inquiries ({inquiries.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Client Detail</th>
                                        <th className="px-6 py-4">Inquiry details</th>
                                        <th className="px-6 py-4">Submitted Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {inquiries.map((inquiry) => (
                                        <tr key={inquiry._id} className="hover:bg-muted/5 align-top">
                                            <td className="px-6 py-6">
                                                <div className="font-semibold text-foreground">{inquiry.name}</div>
                                                <div className="text-sm text-muted-foreground mt-1">{inquiry.email}</div>
                                                {inquiry.phone && <div className="text-xs text-muted-foreground mt-0.5">{inquiry.phone}</div>}
                                            </td>
                                            <td className="px-6 py-6 max-w-md">
                                                {inquiry.productRef && (
                                                    <span className="inline-block px-2.5 py-0.5 bg-gold/10 text-gold text-xs rounded-full border border-gold/20 mb-2 font-medium">
                                                        Ref: {inquiry.productRef}
                                                    </span>
                                                )}
                                                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{inquiry.message}</p>
                                            </td>
                                            <td className="px-6 py-6 text-sm text-muted-foreground">
                                                {new Date(inquiry.createdAt || inquiry.date).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <Button size="sm" variant="destructive" onClick={() => handleDeleteInquiry(inquiry._id)}>
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {inquiries.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                                No inquiries found. Contact requests will show up here.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* CATEGORIES TAB */}
                {activeTab === 'categories' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Categories List */}
                        <div className="lg:col-span-8 bg-card border border-border rounded-xl overflow-hidden shadow-sm h-fit">
                            <div className="p-6 border-b border-border bg-muted/20">
                                <h2 className="text-xl font-semibold">Categories ({categories.length})</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Slug</th>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {categories.map((cat) => (
                                            <tr key={cat._id} className="hover:bg-muted/5">
                                                <td className="px-6 py-4 font-semibold">{cat.name}</td>
                                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{cat.slug}</td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">{cat.description || '-'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(cat._id)}>
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {categories.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                                    No categories found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Create Category Panel */}
                        <div className="lg:col-span-4 bg-card border border-border rounded-xl p-6 shadow-sm h-fit">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-gold" />
                                Create Category
                            </h2>
                            <form onSubmit={handleCreateCategorySubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Category Name</label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Steam Rooms"
                                        value={newCategoryName}
                                        onChange={(e) => {
                                            setNewCategoryName(e.target.value);
                                            // Auto slug generation helper
                                            setNewCategorySlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Slug (URL string)</label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. steam-rooms"
                                        value={newCategorySlug}
                                        onChange={(e) => setNewCategorySlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Description (Optional)</label>
                                    <Textarea
                                        placeholder="Brief description of the category..."
                                        value={newCategoryDesc}
                                        onChange={(e) => setNewCategoryDesc(e.target.value)}
                                        className="h-20"
                                    />
                                </div>
                                <Button type="submit" variant="gold" className="w-full mt-2" disabled={isCreatingCategory}>
                                    {isCreatingCategory ? (
                                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</>
                                    ) : (
                                        'Create Category'
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdminDashboard;
