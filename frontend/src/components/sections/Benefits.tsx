import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Droplets, Heart, Zap, Moon, Leaf } from 'lucide-react';

const benefits = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Deep Relaxation',
    description: 'Release tension and stress as your body unwinds in therapeutic warmth.',
    color: 'text-amber-500',
    shadow: 'shadow-amber-500/25',
    glow: 'bg-amber-500',
    border: 'group-hover:border-amber-500/30',
    bgHover: 'group-hover:bg-amber-500/5',
    delay: 0.1
  },
  {
    id: 2,
    icon: Droplets,
    title: 'Detoxification',
    description: 'Natural sweating helps eliminate toxins and purify your body for a renewed feeling.',
    color: 'text-cyan-500',
    shadow: 'shadow-cyan-500/25',
    glow: 'bg-cyan-500',
    border: 'group-hover:border-cyan-500/30',
    bgHover: 'group-hover:bg-cyan-500/5',
    delay: 0.2
  },
  {
    id: 3,
    icon: Heart,
    title: 'Better Circulation',
    description: 'Heat therapy improves blood flow and cardiovascular health, promoting overall vitality.',
    color: 'text-rose-500',
    shadow: 'shadow-rose-500/25',
    glow: 'bg-rose-500',
    border: 'group-hover:border-rose-500/30',
    bgHover: 'group-hover:bg-rose-500/5',
    delay: 0.3
  },
  {
    id: 4,
    icon: Zap,
    title: 'Muscle Recovery',
    description: 'Accelerate healing and reduce soreness after physical activity to maximize performance.',
    color: 'text-orange-500',
    shadow: 'shadow-orange-500/25',
    glow: 'bg-orange-500',
    border: 'group-hover:border-orange-500/30',
    bgHover: 'group-hover:bg-orange-500/5',
    delay: 0.2
  },
  {
    id: 5,
    icon: Moon,
    title: 'Improved Sleep',
    description: 'Regular sauna use promotes deeper, more restorative sleep for better mental clarity.',
    color: 'text-indigo-500',
    shadow: 'shadow-indigo-500/25',
    glow: 'bg-indigo-500',
    border: 'group-hover:border-indigo-500/30',
    bgHover: 'group-hover:bg-indigo-500/5',
    delay: 0.3
  },
  {
    id: 6,
    icon: Leaf,
    title: 'Skin Health',
    description: 'Open pores and cleanse skin for a natural, healthy glow that radiates from within.',
    color: 'text-emerald-500',
    shadow: 'shadow-emerald-500/25',
    glow: 'bg-emerald-500',
    border: 'group-hover:border-emerald-500/30',
    bgHover: 'group-hover:bg-emerald-500/5',
    delay: 0.4
  }
];

export const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 bg-background relative overflow-visible">
      {/* Sophisticated Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />

      {/* Ambient Light Orbs - Subtle pulsing */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 opacity-100 transition-opacity duration-1000">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-24 px-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent font-medium text-sm uppercase tracking-[0.2em]">
                The Science of Wellness
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95]"
            >
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">
                Everyday Rituals
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-md leading-relaxed pb-2"
          >
            Discover the transformative power of heat therapy. Precision-engineered comfort meets scientifically proven health benefits.
          </motion.p>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: benefit.delay }}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`group relative 
                ${index % 3 === 1 ? 'lg:translate-y-16' : ''} 
              `}
            >
              {/* Diffuse Colored Shadow Blob */}
              <div className={`absolute inset-6 rounded-[3rem] ${benefit.glow} blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`} />

              {/* Main Card */}
              <div className={`relative h-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/60 shadow-sm ${benefit.shadow} group-hover:shadow-2xl transition-all duration-300 overflow-hidden ${benefit.border} ${benefit.bgHover}`}>

                {/* "Bezel" Highlight */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-white/50 pointer-events-none" />

                {/* Icon Sphere */}
                <div className="relative w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-white to-white/50 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {/* Icon Inner Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-transparent to-${benefit.color.split('-')[1]}-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />
                  <benefit.icon className={`w-9 h-9 ${benefit.color} relative z-10`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-black transition-colors tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground/90 leading-relaxed group-hover:text-foreground transition-colors">
                    {benefit.description}
                  </p>
                </div>

                {/* Glass Reflection Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
