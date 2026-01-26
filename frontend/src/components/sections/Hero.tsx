import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-cinematic.jpg';

export const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={heroImage}
            alt="Luxury modern sauna overlooking a forest"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Cinematic Gradient Overlay - Darker for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
        >
          {/* Tagline */}
          <motion.div variants={fadeInUp} className="mb-6 mt-20 relative">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(var(--gold),0.5)] animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Designed for relaxation. Built for life.</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
          >
            Premium Sauna & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white/90 to-gold bg-300% animate-shimmer whitespace-nowrap">
              Wellness&nbsp;Solutions
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg md:text-xl font-light mb-10 max-w-2xl leading-relaxed"
          >
            Custom Saunas • Steam Rooms • Smart Jacuzzis • Accessories • Maintenance
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Button
              size="xl"
              className="bg-white text-black hover:bg-white/90 font-medium px-8 text-lg min-w-[180px] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.02]"
              asChild
            >
              <Link to="/contact">
                Request a Quote
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm px-8 text-lg min-w-[180px] transition-all duration-300"
              asChild
            >
              <Link to="/products">
                Explore Products
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors duration-300">Discover More</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 group-hover:via-white transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down" />
        </div>
      </motion.button>
    </section>
  );
};
