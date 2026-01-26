import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, X, ZoomIn, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


import { getGallery } from '@/services/api';

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id, // Map for UI key
          src: item.image,
          alt: item.title, // Ensure alt is available
          location: item.location || 'Location not specified',
          year: item.year || '2024',
          description: item.description
        }));
        setProjects(mappedData);
      } catch (error) {
        console.error('Failed to fetch gallery', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category)))];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header & Filter */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16">
          <div className="max-w-2xl">
            <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.95] mb-6">
              Curated <br />
              <span className="text-muted-foreground italic font-light">Installations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              Explore our collection of bespoke wellness environments, from private residential sanctuaries to luxury commercial spas.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
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
                    alt={project.title}
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

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative max-w-7xl w-full h-full flex flex-col lg:flex-row gap-10 items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="relative w-full max-h-[80vh] lg:h-full lg:flex-1 flex items-center justify-center">
                <img
                  src={selectedProject.src}
                  alt={selectedProject.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Info Panel (Desktop Sidebar / Mobile Bottom) */}
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

    </section>
  );
};
