import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types/product';


const categories = ['All', 'Saunas', 'Steam Rooms', 'Jacuzzis', 'Accessories'];

const ProductsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => activeCategory === 'All' ||
      (product.category && product.category.name === activeCategory) || // Assumes category object has name matching filter
      // Fallback for simple string match if applicable or loose matching
      (product.category && typeof product.category === 'string' && product.category === activeCategory)
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">
              Our Products
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Wellness
              <span className="text-accent"> Collection</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover our curated selection of saunas, steam rooms, jacuzzis, and accessories.
              Each product is crafted with premium materials and designed for lasting performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters - Luxurious Floating Dock */}
      <section className="sticky top-24 z-30 py-8 pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="flex justify-center pointer-events-auto">
            <nav className="bg-white/80 backdrop-blur-xl rounded-full p-1.5 flex flex-wrap justify-center gap-1 shadow-2xl shadow-black/5 border border-white/40 ring-1 ring-black/5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative ${activeCategory === category
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  <span className="relative z-10">{category}</span>
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#1a1a1a] rounded-full shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Products Grid - Magazine Style */}
      <section className="py-20  bg-background relative">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-gold font-medium tracking-[0.2em] text-sm uppercase mb-3 block">Excellence in Design</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Explore Our Collection</h2>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading products...</div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  layout
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/products/${product.slug}`)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-6 group-hover:shadow-2xl group-hover:shadow-black/5 transition-all duration-700">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Floating Action */}
                    <div className="absolute bottom-6 right-6 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-charcoal shadow-lg hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium uppercase tracking-wider text-charcoal rounded-sm border border-white/20">
                        {product.category?.name || 'Product'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 group-hover:translate-x-2 transition-transform duration-500">
                    <div className="flex justify-between items-start border-b border-border/40 pb-4 mb-4 relative">
                      <div className="max-w-[65%]">
                        <h3 className="font-display text-2xl font-semibold text-foreground leading-tight group-hover:text-active transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-body text-lg font-medium text-gold transition-colors duration-300">
                          NPR. {product.price.toLocaleString()}
                        </span>
                      </div>
                      {/* Animated Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-700" />
                    </div>

                    <p className="text-muted-foreground font-light line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border/30 mt-4">
                      {product.features?.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium text-white/90 bg-charcoal rounded-full border border-white/10 group-hover:border-gold/30 group-hover:text-gold transition-all duration-500"
                        >
                          <span className="w-1 h-1 rounded-full bg-gold transition-colors" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA - Premium Cinematic Redesign */}
      <section className="relative py-32 bg-[#050505] overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Not finding exactly what<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gold/80 to-white animate-shimmer bg-[length:200%_100%]">
                  you're looking for?
                </span>
              </h2>
              <p className="text-xl text-white/60 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
                Our bespoke division specializes in translating unique visions into reality.
                From challenging layouts to specific material requests.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button variant="gold" size="xl" className="min-w-[200px] shadow-lg shadow-gold/10 hover:shadow-gold/20 transition-all duration-500 relative overflow-hidden group" asChild>
                  <Link to="/custom-solutions">
                    <span className="relative z-10">Start Custom Project</span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                  </Link>
                </Button>
                <Link
                  to="/contact"
                  className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide uppercase font-medium"
                >
                  <span>Talk to a Designer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ProductsPage;
