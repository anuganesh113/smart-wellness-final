import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/services/api';
import { Product } from '@/types/product';

export const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();
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

  // Display only the first 3 products to keep the homepage clean
  const displayProducts = products.slice(0, 3);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(228,180,84,0.03),transparent_40%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-accent font-medium text-sm uppercase tracking-widest">
                Exquisite Craftsmanship
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              Wellness <span className="text-muted-foreground font-light italic">Reimagined</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="outline" size="lg" className="rounded-full px-8 border-foreground/20 hover:bg-foreground hover:text-background transition-colors" asChild>
              <Link to="/products">
                View Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-sm bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
          >
            {displayProducts.map((product, index) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
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

                  {product.features && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border/30 mt-4">
                      {product.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium text-white/90 bg-charcoal rounded-full border border-white/10 group-hover:border-gold/30 group-hover:text-gold transition-all duration-500"
                        >
                          <span className="w-1 h-1 rounded-full bg-gold transition-colors" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
