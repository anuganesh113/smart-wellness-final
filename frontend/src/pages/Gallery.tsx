import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { X, ZoomIn, ArrowUpRight, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


import { getGallery } from '@/services/api';

interface GalleryItem {
  _id: string;
  id?: string; // mapped for UI
  title: string;
  image: string;
  src?: string; // mapped for UI
  category: string;
  location: string;
  year?: string;
  description?: string;
}

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        // Map backend data to UI format if needed, though we can use properties directly
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id,
          src: item.image,
          alt: item.title,
          // location is now in backend, or fallback
          location: item.location || 'Location not specified',
          year: item.year || '2024',
          description: item.description
        }));
        setGalleryItems(mappedData);
      } catch (error) {
        console.error('Failed to fetch gallery', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Extract unique categories from items
  const categories = ['All', ...Array.from(new Set(galleryItems.map((item: any) => item.category)))];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item: any) => item.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;

      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredItems.findIndex(item => item.id === selectedProject.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedProject(filteredItems[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredItems.findIndex(item => item.id === selectedProject.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setSelectedProject(filteredItems[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, filteredItems]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">
              Our Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[0.95]">
              Curated <br />
              <span className="text-muted-foreground italic font-light">Installations</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore our collection of completed projects spanning luxury homes,
              world-class hotels, and stunning outdoor spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative ${activeCategory === cat
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-black/5'
                  }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-charcoal rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-100 shadow-md transition-all duration-500 group-hover:shadow-xl">
                    <img
                      src={project.src}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

                    {/* Center Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100 transition-transform delay-100">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                          <h3 className="text-white font-display text-2xl mb-1">{project.title}</h3>
                          <p className="text-white/70 text-sm">{project.location}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gold transition-colors">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Footer CTA */}
          <div className="mt-20 text-center">
            <Button variant="outline" size="lg" className="rounded-full gap-2 hover:bg-charcoal hover:text-white transition-all">
              <Instagram className="w-4 h-4" />
              Follow us on Instagram
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 lg:p-10"
            onClick={() => setSelectedProject(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredItems.findIndex(item => item.id === selectedProject.id);
                const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                setSelectedProject(filteredItems[prevIndex]);
              }}
              className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredItems.findIndex(item => item.id === selectedProject.id);
                const nextIndex = (currentIndex + 1) % filteredItems.length;
                setSelectedProject(filteredItems[nextIndex]);
              }}
              className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl w-full h-full flex flex-col lg:flex-row gap-10 items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="relative w-full max-h-[80vh] lg:h-full lg:flex-1 flex items-center justify-center">
                <img
                  src={selectedProject.src}
                  alt={selectedProject.alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-96 text-white p-6 lg:p-0">
                <span className="text-gold text-sm font-bold uppercase tracking-widest mb-3 block">
                  {selectedProject.category}
                </span>
                <h3 className="font-display text-4xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-white/60 leading-relaxed mb-8">
                  {selectedProject.description || `This exclusive installation in ${selectedProject.location} features premium finishings and state-of-the-art wellness technology, bespoke tailored to the client's vision.`}
                </p>

                <div className="grid grid-cols-1 gap-6 mb-8 border-t border-white/10 pt-8">
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Year</span>
                    <span className="text-lg">{selectedProject.year || '2024'}</span>
                  </div>
                </div>

                <Button className="w-full rounded-full bg-white text-black hover:bg-gold hover:text-white border-0 h-12 text-base" asChild>
                  <Link to="/contact">Request Similar Design</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default GalleryPage;
