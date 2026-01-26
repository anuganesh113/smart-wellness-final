import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';
import { getProducts, getGallery } from '@/services/api';
import api from '@/services/api';
import { Plus, Trash, Edit, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchProducts();
        fetchGalleryItems();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGalleryItems = async () => {
        try {
            const data = await getGallery();
            setGalleryItems(data);
        } catch (error) {
            console.error(error);
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

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-32">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
                    <div className="space-x-4">
                        <Button onClick={handleLogout} variant="outline">Logout</Button>
                        <Button asChild variant="gold">
                            <Link to="/admin/gallery/new"><ImageIcon className="w-4 h-4 mr-2" /> Add Gallery Item</Link>
                        </Button>
                        <Button asChild variant="gold">
                            <Link to="/admin/product/new"><Plus className="w-4 h-4 mr-2" /> Add Product</Link>
                        </Button>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="bg-card border border-border rounded-xl overflow-hidden mb-12">
                    <h2 className="text-xl font-semibold p-6 border-b border-border bg-muted/20">Gallery Items</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Location</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {galleryItems.map((item) => (
                                    <tr key={item._id} className="hover:bg-muted/5">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{item.title}</td>
                                        <td className="px-6 py-4">{item.category}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{item.location || '-'}</td>
                                    </tr>
                                ))}
                                {galleryItems.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                            No gallery items found. Add one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <h2 className="text-xl font-semibold p-6 border-b border-border bg-muted/20">Products</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-muted/5">
                                        <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{product._id}</td>
                                        <td className="px-6 py-4 font-medium">{product.name}</td>
                                        <td className="px-6 py-4">{product.price}</td>
                                        <td className="px-6 py-4">{product.category?.name || 'N/A'}</td>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
