import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Suraj Shrestha',
    role: 'Homeowner',
    location: 'Pacific Heights, CA',
    content: 'Smart Wellness transformed our basement into a stunning wellness retreat. The attention to detail and quality of materials exceeded our expectations. It\'s become our daily sanctuary.',
    rating: 5,
    date: 'March 2025'
  },
  {
    id: 2,
    name: 'Gagan Poudel',
    role: 'Hotel Director',
    location: 'Sunrise Hotel',
    content: 'We\'ve partnered with Smart Wellness for our spa renovations across three properties. Their commercial expertise, from custom saunas to steam room engineering, is unmatched in the industry.',
    rating: 5,
    date: 'January 2025'
  },
  {
    id: 3,
    name: 'Raju Shrestha',
    role: 'Spa Owner',
    location: 'Serenity Wellness',
    content: 'From design to installation, the team was professional and creative. Our clients constantly compliment our new steam rooms. It was the best investment we\'ve made for our business this year.',
    rating: 4,
    date: 'February 2025'
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const ref = useRef(null);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play (optional, slow)
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      position: 'absolute' as const // Fix layout shift during exit
    }),
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-charcoal relative overflow-hidden text-white">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-12 h-px bg-gold/50" />
            <span className="text-gold font-medium text-sm uppercase tracking-[0.2em]">Client Stories</span>
            <div className="w-12 h-px bg-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            Trusted by the <span className="italic text-white/60 font-light">Best</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative min-h-[400px]">
          {/* Background Giant Quote Mark */}
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 text-white/5 font-serif text-[12rem] leading-none select-none pointer-events-none">
            “
          </div>

          <div className="relative overflow-hidden p-2">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="w-full flex flex-col items-center text-center"
              >
                {/* Rating Script */}
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-2xl md:text-4xl leading-relaxed text-white/90 mb-10 max-w-3xl">
                  "{testimonials[activeIndex].content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-display font-bold text-gold">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                      <span className="flex items-center gap-1 text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">{testimonials[activeIndex].role} • {testimonials[activeIndex].location}</p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12 z-20 relative">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all w-12 h-12"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all w-12 h-12"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
