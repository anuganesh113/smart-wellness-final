import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, PenTool, Hammer, BadgeCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import customSaunaImage from '@/assets/gallery-1.jpg'; // Using a gallery image for showcase

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Consultation',
    description: 'We begin by understanding your vision, space requirements, and wellness goals.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Design',
    description: 'Our architects create immersive 3D renderings tailored to your exact specifications.',
  },
  {
    icon: Hammer,
    step: '03',
    title: 'Craftsmanship',
    description: 'Master artisans build your sanctuary using the finest sustainably sourced materials.',
  },
  {
    icon: BadgeCheck,
    step: '04',
    title: 'Installation',
    description: 'A seamless installation process ensures your custom solution performs perfectly.',
  },
];

export const CustomSolutions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-charcoal text-cream overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[900px]">

        {/* Left: Content & Timeline */}
        <div className="relative z-10 p-8 lg:p-24 flex flex-col justify-center">
          {/* Decorative Background for Text Side */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(228,180,84,0.05),transparent_60%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium text-sm uppercase tracking-widest">
              Bespoke Excellence
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
          >
            Tailored to Your <br />
            <span className="text-gold italic font-light">Exact Vision</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/80 text-lg leading-relaxed max-w-xl mb-16"
          >
            Beyond our premium collection, we specialize in creating one-of-a-kind wellness sanctuaries.
            Whether for a private residence or a luxury hotel, our team brings your unique concept to life.
          </motion.p>

          {/* Vertical Timeline */}
          <div className="space-y-10 relative pl-8 border-l border-white/10 ml-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-charcoal border border-gold/50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>

                <div className="flex items-start gap-5">
                  <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/5">
                    <step.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-semibold mb-2 flex items-center gap-3">
                      {step.title} <span className="text-xs font-sans text-white/20 tracking-wider">0{index + 1}</span>
                    </h4>
                    <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <Button variant="gold" size="xl" className="px-10 text-white relative overflow-hidden group" asChild>
              <Link to="/custom-solutions">
                <span className="relative z-10 flex items-center">
                  Start Your Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: Immersive Image */}
        <div className="relative h-[600px] lg:h-auto overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={customSaunaImage}
              alt="Custom Sauna Interior"
              className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent lg:bg-gradient-to-l" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
