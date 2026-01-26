import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    MessageSquare,
    Pencil,
    Hammer,
    Truck,
    HeadphonesIcon,
    Check,
    Ruler,
    Palette,
    Thermometer
} from 'lucide-react';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import saunaProduct from '@/assets/sauna-product.jpg';

const steps = [
    {
        icon: MessageSquare,
        step: '01',
        title: 'Initial Consultation',
        description: 'We start with a detailed discussion about your vision, space requirements, and wellness goals. Our experts will visit your location to assess the possibilities.',
    },
    {
        icon: Pencil,
        step: '02',
        title: 'Custom Design',
        description: 'Our design team creates detailed 3D renderings and technical specifications. You\'ll see exactly how your wellness space will look before we begin construction.',
    },
    {
        icon: Hammer,
        step: '03',
        title: 'Expert Craftsmanship',
        description: 'Skilled artisans handcraft your sauna or steam room using premium materials. Every joint, every panel is crafted to perfection in our workshop.',
    },
    {
        icon: Truck,
        step: '04',
        title: 'Professional Installation',
        description: 'Our certified installation team handles every detail, from electrical to ventilation. We ensure your wellness space is perfectly integrated into your home.',
    },
    {
        icon: HeadphonesIcon,
        step: '05',
        title: 'Lifetime Support',
        description: 'Enjoy peace of mind with our comprehensive warranty and maintenance programs. Our support team is always available to keep your investment in pristine condition.',
    },
];

const features = [
    { icon: Ruler, title: 'Any Size', description: 'Custom dimensions to fit your space perfectly' },
    { icon: Palette, title: 'Your Style', description: 'Choose from multiple wood types and finishes' },
    { icon: Thermometer, title: 'Smart Controls', description: 'Integrate with your smart home system' },
];

const CustomSolutionsPage = () => {
    const processRef = useRef(null);
    const isProcessInView = useInView(processRef, { once: true, margin: '-100px' });

    return (
        <Layout>
            {/* Hero - Cinematic Redesign */}
            <section className="relative h-[90vh] min-h-[650px] flex items-center justify-center overflow-hidden">
                {/* Cinematic Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black/30 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20 z-10" />
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        src={gallery2}
                        alt="Luxury custom sauna installation"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Floating Glass Content */}
                <div className="relative z-20 container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 mx-auto">
                                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                <span className="text-white/90 text-xs font-bold uppercase tracking-[0.2em]">Bespoke Wellness Design</span>
                            </div>

                            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-xl">
                                Your Vision. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer bg-[length:200%_100%]">
                                    Masterfully Crafted.
                                </span>
                            </h1>

                            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-md">
                                We transform complex wellness concepts into breathtaking realities.
                                Experience the pinnacle of custom sauna and spa engineering.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Button variant="gold" size="xl" className="shadow-lg shadow-gold/20 hover:scale-105 transition-all duration-300 text-white relative overflow-hidden group" asChild>
                                    <Link to="/contact">
                                        <span className="relative z-10 flex items-center">
                                            Start Your Project
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </span>
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="xl" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm" asChild>
                                    <Link to="/gallery">
                                        View Portfolio
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator - Premium Mouse Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-medium animate-pulse">Scroll</span>
                    <div className="w-[30px] h-[50px] border-2 border-white/20 rounded-full p-2 flex justify-center backdrop-blur-sm bg-white/5">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-gold rounded-full shadow-gold-glow"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Why Custom - Premium Architectural Redesign */}
            <section className="py-32 bg-[#F8F9FA] relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6">
                                <span className="w-8 h-[1px] bg-gold"></span>
                                <span className="text-gold font-medium text-xs uppercase tracking-[0.2em]">Why Go Custom?</span>
                            </div>

                            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">
                                Tailored to your <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">exact lifestyle.</span>
                                    <span className="absolute bottom-2 left-0 w-full h-3 bg-gold/20 -z-0"></span>
                                </span>
                            </h2>

                            <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light max-w-lg">
                                Off-the-shelf solutions rarely align with your unique vision. We approach every project as a commission, crafting space that perfectly fits your home and rituals.
                            </p>

                            <div className="grid gap-6">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 hover:border-gold/30 flex items-start gap-5"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#FAF9F6] group-hover:bg-gold flex items-center justify-center transition-colors duration-300 shrink-0">
                                            <feature.icon className="w-5 h-5 text-charcoal group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-lg font-bold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">{feature.title}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Visual Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Main Image Frame */}
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                                <img
                                    src={saunaProduct}
                                    alt="Custom sauna design"
                                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                                />
                            </div>

                            {/* Floating Stat Card */}
                            <div className="absolute -bottom-10 -left-10 z-20 bg-charcoal text-white p-8 rounded-xl shadow-2xl max-w-[200px] border border-white/10 hidden md:block">
                                <div className="text-4xl font-display font-bold text-gold mb-1">100%</div>
                                <div className="text-sm font-light text-white/70 uppercase tracking-wider">Dedicated to Perfection</div>
                            </div>

                            {/* Decorative Frame */}
                            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-gold/30 rounded-2xl z-0" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Process - Dark Premium Timeline */}
            <section ref={processRef} className="py-32 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-sm mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            <span className="text-gold font-medium text-xs uppercase tracking-[0.2em]">The Journey</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                            From Concept to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-white animate-shimmer bg-[length:200%_100%]">
                                Reality.
                            </span>
                        </motion.h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center mb-16 md:mb-24 last:mb-0 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline Dot (Desktop) */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gold bg-[#0a0a0a] z-20 hidden md:block">
                                    <div className="absolute inset-0 bg-gold/50 rounded-full animate-ping opacity-20" />
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-center md:text-right' : 'md:pl-16 text-center md:text-left'}`}>
                                    <div className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-gold/30 transition-all duration-500 backdrop-blur-sm">
                                        <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-20 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/20 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                            <step.icon className="w-6 h-6 text-gold" />
                                        </div>

                                        <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">{step.title}</h3>
                                        <p className="text-white/60 leading-relaxed font-light">{step.description}</p>

                                        <div className="absolute top-4 right-4 text-[40px] font-display font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-500 select-none pointer-events-none">
                                            {step.step}
                                        </div>
                                    </div>
                                </div>

                                {/* Empty Half for Alignment */}
                                <div className="w-full md:w-1/2 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Before/After */}
            <section className="py-24 bg-muted/50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">
                            Transformations
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                            See the Difference
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden"
                        >
                            <img src={gallery3} alt="Completed sauna project" className="w-full aspect-[4/3] object-cover" />
                            <div className="bg-card p-6">
                                <h3 className="font-display text-lg font-semibold text-foreground">Modern Home Spa</h3>
                                <p className="text-muted-foreground text-sm">Dhapakhel, Lalitpur</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-2xl overflow-hidden"
                        >
                            <img src={gallery2} alt="Spa wellness center" className="w-full aspect-[4/3] object-cover" />
                            <div className="bg-card p-6">
                                <h3 className="font-display text-lg font-semibold text-foreground">Wellness Center</h3>
                                <p className="text-muted-foreground text-sm">The Grand Resort, Napa Valley</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA - Cinematic Luxury */}
            <section className="relative py-32 overflow-hidden">
                {/* Background with Parallax feel */}
                <div className="absolute inset-0 bg-[#050505]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(228,180,84,0.5)]" />
                            <span className="text-white/80 text-sm font-medium tracking-wider uppercase">Limited Commission Slots Available</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                        >
                            Ready to Craft <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer bg-[length:200%_100%]">
                                Your Masterpiece?
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
                        >
                            Your vision deserves uncompromising execution. Schedule a private consultation with our principal design team to begin your journey.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <Button variant="gold" size="xl" className="h-16 px-10 text-lg md:text-xl min-w-[240px] shadow-[0_0_30px_rgba(228,180,84,0.3)] hover:shadow-[0_0_50px_rgba(228,180,84,0.5)] transition-all duration-500 text-white relative overflow-hidden group" asChild>
                                <Link to="/contact">
                                    <span className="relative z-10">Start Your Project</span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                                </Link>
                            </Button>

                            <Button variant="outline" size="xl" className="h-16 px-10 text-lg md:text-xl min-w-[240px] border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300 group" asChild>
                                <Link to="/contact">
                                    Talk to an Expert
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CustomSolutionsPage;
