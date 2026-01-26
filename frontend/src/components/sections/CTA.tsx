import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroCinematic from '@/assets/hero-cinematic.jpg'; // Switched to cinematic background

export const CTA = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="py-32 lg:py-48 relative overflow-hidden flex items-center justify-center min-h-[80vh]">

      {/* Cinematic Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroCinematic}
          alt="Luxury Sauna Interior"
          className="w-full h-full object-cover scale-110"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-charcoal/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/80" />
      </motion.div>

      {/* Floating Particles (Optional polish) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block border border-white/20 rounded-full px-6 py-2 bg-white/5 backdrop-blur-sm text-gold font-medium text-sm uppercase tracking-widest mb-6">
              Begin Your Transformation
            </span>

            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
              Ready to <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">Elevate</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute bottom-2 left-0 h-4 bg-gold/30 -z-0 skew-x-12"
                />
              </span>
              {' '}Your Space?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light"
          >
            Schedule a personal consultation with our design experts.
            We'll guide you through every step of creating your bespoke wellness sanctuary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              variant="gold"
              size="xl"
              asChild
              className="relative overflow-hidden group min-w-[240px] text-white"
            >
              <Link to="/contact">
                <span className="relative z-10 flex items-center">
                  Request Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="xl"
              asChild
              className="min-w-[240px] border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-sm"
            >
              <a href="https://wa.me/9779851004505" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2" />
                Speak to an Expert
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-8 text-white/40 text-sm"
          >
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Available Mon-Sat</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Nationwide Shipping</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
