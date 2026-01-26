import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getProducts } from '@/services/api'; // Added getProducts
import { Product } from '@/types/product';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Info, Minus, Plus, Star, Phone, Mail, Award, ShieldCheck, Leaf, Zap, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProductGallery } from '@/components/products/ProductGallery';

const iconMap: Record<string, any> = {
    Award, ShieldCheck, Leaf, Zap, Star, User, Info, Check, Phone, Mail
};

const ProductDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Product Data
    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                // Fetch current product
                const productData = await getProductBySlug(slug);
                setProduct(productData);

                // Fetch related products (mock logic: same category or random)
                // In a real app, backend should provide this or filter efficiently
                const allProducts = await getProducts();
                const related = allProducts
                    .filter((p: Product) => p._id !== productData._id && p.category?.name === productData.category?.name)
                    .slice(0, 3);
                setRelatedProducts(related.length > 0 ? related : allProducts.slice(0, 3)); // Fallback if no specific related found

            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                        <p className="text-muted-foreground font-light tracking-widest text-sm uppercase">Loading Experience...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
                    <h1 className="text-3xl font-display text-foreground">Product Not Found</h1>
                    <p className="text-muted-foreground">The item you are looking for is currently unavailable.</p>
                    <Button asChild variant="gold">
                        <Link to="/products">Back to Collection</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <Layout>
            <div className="bg-background min-h-screen">
                {/* Product Hero Section */}
                <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                            {/* Left: Product Images Gallery */}
                            <motion.div
                                className="lg:col-span-7"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <ProductGallery
                                    images={product.images}
                                    name={product.name}
                                    categoryName={product.category?.name}
                                />
                            </motion.div>

                            {/* Right: Product Info & Actions (Sticky) */}
                            <motion.div
                                className="lg:col-span-5 h-full"
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >
                                <div className="sticky top-28 space-y-8">
                                    {/* Header */}
                                    <motion.div variants={fadeIn} className="space-y-4">
                                        <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-bold text-foreground leading-tight">
                                            {product.name}
                                        </h1>
                                        <div className="flex items-center gap-4">
                                            <span className="font-body text-3xl font-light text-gold">
                                                NPR. {product.price.toLocaleString()}
                                            </span>
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium border-l border-border pl-4">
                                                VAT Included
                                            </span>
                                        </div>
                                        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-md">
                                            {product.shortDescription}
                                        </p>
                                    </motion.div>

                                    <div className="h-px bg-border/40 w-full" />

                                    {/* CTAs */}
                                    <motion.div variants={fadeIn} className="space-y-4">
                                        <div className="flex flex-col gap-3">
                                            <Button size="xl" className="w-full text-base h-14 shadow-gold/20 shadow-lg hover:shadow-gold/40 transition-all font-medium tracking-wide" asChild>
                                                <Link to="/contact">
                                                    Request a Quote
                                                    <ArrowRight className="w-5 h-5 ml-2" />
                                                </Link>
                                            </Button>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Button variant="outline" size="xl" className="w-full text-sm h-12 font-medium hover:text-white group" asChild>
                                                    <a href="https://wa.me/9779851004505" target="_blank" rel="noopener noreferrer">
                                                        <Phone className="w-4 h-4 mr-2 text-gold group-hover:text-white transition-colors" />
                                                        Call Expert
                                                    </a>
                                                </Button>
                                                <Button variant="outline" size="xl" className="w-full text-sm h-12 font-medium hover:text-white group" asChild>
                                                    <a href="mailto:cbschandrashrestha@gmail.com">
                                                        <Mail className="w-4 h-4 mr-2 text-gold group-hover:text-white transition-colors" />
                                                        Email Us
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-center text-muted-foreground/60 italic">
                                            * Customization options available upon request
                                        </p>
                                    </motion.div>

                                    {/* Key Highlights */}
                                    <motion.div variants={fadeIn} className="grid grid-cols-2 gap-x-8 gap-y-10 pt-10">
                                        {product.keyHighlights && product.keyHighlights.length > 0 ? (
                                            product.keyHighlights.map((highlight, idx) => {
                                                const Icon = iconMap[highlight.icon] || Star;
                                                return (
                                                    <div key={idx} className="flex flex-col gap-4 group">
                                                        <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gold/[0.03] border border-gold/10 group-hover:border-gold/30 group-hover:bg-gold/[0.08] transition-all duration-500 shadow-sm">
                                                            <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                            <Icon className="w-6 h-6 text-gold relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/90">{highlight.title}</p>
                                                            <p className="text-xs text-muted-foreground font-light leading-relaxed pr-4">
                                                                {highlight.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <>
                                                {/* Fallback Static Highlights if none exist */}
                                                <div className="flex flex-col gap-4 group">
                                                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gold/[0.03] border border-gold/10 group-hover:border-gold/30 group-hover:bg-gold/[0.08] transition-all duration-500 shadow-sm">
                                                        <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                        <Award className="w-6 h-6 text-gold relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/90">Premium Selection</p>
                                                        <p className="text-xs text-muted-foreground font-light leading-relaxed pr-4">
                                                            Artisan crafted using the world's finest, most durable materials.
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* ... other static items can stay as fallback or be removed? Let's keep 4 fallbacks for now or just one example. 
                                                    Actually, to keep it clean, if no highlights, show nothing or just these defaults.
                                                    I will replicate the 4 defaults as fallback for now to avoid empty space if data is missing.
                                                */}
                                                <div className="flex flex-col gap-4 group">
                                                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gold/[0.03] border border-gold/10 group-hover:border-gold/30 group-hover:bg-gold/[0.08] transition-all duration-500 shadow-sm">
                                                        <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                        <ShieldCheck className="w-6 h-6 text-gold relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/90">Lifetime Assurance</p>
                                                        <p className="text-xs text-muted-foreground font-light leading-relaxed pr-4">
                                                            Comprehensive 5-year coverage for your ultimate peace of mind.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4 group">
                                                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gold/[0.03] border border-gold/10 group-hover:border-gold/30 group-hover:bg-gold/[0.08] transition-all duration-500 shadow-sm">
                                                        <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                        <Leaf className="w-6 h-6 text-gold relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/90">Eco-Conscious</p>
                                                        <p className="text-xs text-muted-foreground font-light leading-relaxed pr-4">
                                                            Sourced from sustainably managed forests with minimal footprint.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4 group">
                                                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gold/[0.03] border border-gold/10 group-hover:border-gold/30 group-hover:bg-gold/[0.08] transition-all duration-500 shadow-sm">
                                                        <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                        <Zap className="w-6 h-6 text-gold relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/90">Smart Efficiency</p>
                                                        <p className="text-xs text-muted-foreground font-light leading-relaxed pr-4">
                                                            Advanced energy-saving tech designed for daily indulgence.
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Details & Specs Tab Section */}
                <section className="py-20 bg-muted/20 border-y border-border/40">
                    <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            {/* Description */}
                            <div className="space-y-6">
                                <h3 className="font-display text-2xl font-bold text-foreground">Product Description</h3>
                                <div className="prose prose-stone text-muted-foreground leading-relaxed">
                                    <p>{product.longDescription}</p>
                                    <p>
                                        Designed with precision and care, the {product.name} exemplifies the perfect balance of luxury and functionality.
                                        Whether for a private residence or a commercial wellness center, this product delivers an unmatched experience.
                                    </p>
                                </div>

                                <h4 className="font-semibold text-foreground pt-4 mb-3">Key Features</h4>
                                <ul className="space-y-3">
                                    {product.features?.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3.5 h-3.5 text-gold" />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Specifications */}
                            <div className="space-y-6">
                                <h3 className="font-display text-2xl font-bold text-foreground">Technical Specifications</h3>
                                <div className="bg-background rounded-xl border border-border/50 overflow-hidden shadow-sm">
                                    <table className="w-full text-sm text-left">
                                        <tbody>
                                            {product.specifications?.length > 0 ? (
                                                product.specifications.map((spec, i) => (
                                                    <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                                                        <td className="py-4 px-6 font-medium text-foreground w-1/3 bg-muted/10">{spec.key}</td>
                                                        <td className="py-4 px-6 text-muted-foreground">{spec.value}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <>
                                                    {/* Fallback Mock Specs if none exist */}
                                                    <tr className="border-b border-border/50 hover:bg-muted/20">
                                                        <td className="py-4 px-6 font-medium text-foreground w-1/3 bg-muted/10">Dimensions</td>
                                                        <td className="py-4 px-6 text-muted-foreground">Customizable (Standard: 200x200cm)</td>
                                                    </tr>
                                                    <tr className="border-b border-border/50 hover:bg-muted/20">
                                                        <td className="py-4 px-6 font-medium text-foreground w-1/3 bg-muted/10">Material</td>
                                                        <td className="py-4 px-6 text-muted-foreground">Premium Canadian Hemlock / Cedar</td>
                                                    </tr>
                                                    <tr className="border-b border-border/50 hover:bg-muted/20">
                                                        <td className="py-4 px-6 font-medium text-foreground w-1/3 bg-muted/10">Capacity</td>
                                                        <td className="py-4 px-6 text-muted-foreground">2-4 Persons</td>
                                                    </tr>
                                                    <tr className="border-b border-border/50 hover:bg-muted/20">
                                                        <td className="py-4 px-6 font-medium text-foreground w-1/3 bg-muted/10">Power</td>
                                                        <td className="py-4 px-6 text-muted-foreground">6.0 kW - 9.0 kW</td>
                                                    </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-accent font-medium text-sm uppercase tracking-widest mb-3 block">Complement Your Space</span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">You May Also Like</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProducts.map((related, index) => (
                                <Link to={`/products/${related.slug}`} key={related._id || index} className="group block">
                                    <div className="relative aspect-[3/4] bg-muted overflow-hidden rounded-sm mb-6">
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                                        <img
                                            src={related.images[0]}
                                            alt={related.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <div className="bg-white p-3 rounded-full shadow-lg text-charcoal">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-display text-xl font-medium text-foreground mb-1 group-hover:text-gold transition-colors">{related.name}</h3>
                                    <p className="text-muted-foreground font-light text-sm">NPR. {related.price.toLocaleString()}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Inquiry Banner */}
                <section className="py-24 bg-charcoal text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Ready to Transform Your Wellness?
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 font-light">
                            Our team of experts is ready to help you design the perfect sauna or spa for your home or business.
                        </p>
                        <Button size="xl" variant="gold" className="text-charcoal font-bold min-w-[200px]" asChild>
                            <Link to="/contact">Get a Free Consultation</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ProductDetails;
