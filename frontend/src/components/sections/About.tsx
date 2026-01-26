import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Paintbrush2, Award, Wrench, HeartHandshake, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aboutImage from '@/assets/about-craftsmanship.jpg';

const features = [
  {
    icon: Paintbrush2,
    title: 'Custom Design',
    description: 'Tailored solutions crafted to your exact specifications.',
  },
  {
    icon: Award,
    title: 'Premium Materials',
    description: 'Hand-selected Canadian cedar and Finnish birch.',
  },
];

export const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px -10% 0px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-background overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <span className="h-[1px] w-12 bg-gold/60"></span>
              <span className="text-gold font-bold text-sm tracking-[0.2em] uppercase">About Us</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1]">
              <motion.span className="inline-block mr-3" variants={wordAnimation}>Crafting</motion.span>
              <motion.span className="inline-block mr-3" variants={wordAnimation}>Wellness</motion.span>
              <br />
              <motion.span className="inline-block mr-3 italic font-serif text-gold" variants={wordAnimation}>Experiences</motion.span>
              <motion.span className="inline-block" variants={wordAnimation} transition={{ delay: 0.3 }}>Since 2025</motion.span>
            </h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 text-balance font-light"
            >
              At Smart Wellness, we specialize in creating premium sauna, steam, and wellness solutions that transform everyday spaces into places of relaxation, health, and luxury. Combining expert craftsmanship, modern technology, and high-quality materials, we deliver wellness experiences built to last.


            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 text-balance font-light"
            >
              From custom-designed saunas and steam rooms to smart jacuzzis, accessories, and complete maintenance services, our work is guided by one simple belief — true wellness begins with thoughtful design and precision execution.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button variant="outline" size="lg" className="group rounded-full px-8 border-foreground/20 hover:border-secondary hover:bg-secondary hover:text-white transition-all duration-300" asChild>
                <Link to="/about">
                  Read Our Story
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <div className="order-1 lg:order-2 relative perspective-1000">
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            >
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img
                  src={aboutImage}
                  alt="Close up of premium cedar wood craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
              </motion.div>
            </motion.div>

            {/* Floating Cards with Glassmorphism */}
            <div className="absolute -bottom-12 -left-4 md:-left-16 w-full max-w-sm space-y-6 z-20">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 50, rotateX: 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-white/80 dark:bg-black/80 backdrop-blur-xl p-5 pr-8 rounded-lg border border-white/20 shadow-xl flex items-center gap-5"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-lg text-foreground mb-0.5">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Background Texture Element */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl z-[-1]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
