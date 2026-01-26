import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    Check,
    Hammer,
    Sparkles,
    Wifi,
    Heart,
} from 'lucide-react';

import heroCinematic from '@/assets/hero-cinematic.jpg';
import aboutCraftsmanship from '@/assets/about-craftsmanship.jpg';

const processSteps = [
    { step: '01', title: 'Consultation', desc: 'Understanding your vision and space.' },
    { step: '02', title: 'Design', desc: 'Creating 3D renders and technical plans.' },
    { step: '03', title: 'Build', desc: 'Handcrafting with premium materials.' },
    { step: '04', title: 'Installation', desc: 'Professional setup and calibration.' },
    { step: '05', title: 'Support', desc: 'Ongoing maintenance and care.' }
];

const differentiators = [
    { icon: Hammer, title: 'Expert Craftsmanship', desc: 'Every detail is hand-finished by master artisans.' },
    { icon: Sparkles, title: 'Premium Materials', desc: 'Sourced from the finest sustainable forests.' },
    { icon: Wifi, title: 'Smart Technology', desc: 'Integrated control systems for modern living.' }
];

const About = () => {
    return (
        <Layout>
            {/* 1. Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroCinematic}
                        alt="Serene wellness space"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="inline-block text-gold/90 font-medium text-sm md:text-base uppercase tracking-[0.2em] mb-6">
                            Our Philosophy
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Crafted for Wellness.<br />
                            <span className="text-white/90">Designed for Life.</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                            Premium sauna, steam, and wellness solutions built with precision and care.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Brand Story */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-sm"
                        >
                            <img
                                src={aboutCraftsmanship}
                                alt="Artisan working on sauna wood"
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                                Transforming spaces into<br />
                                <span className="text-accent italic">sanctuaries.</span>
                            </h2>
                            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                                <p>
                                    At <strong className="text-foreground font-medium">Smart Wellness</strong>, we specialize in creating premium sauna, steam, and wellness solutions that transform everyday spaces into places of relaxation, health, and luxury. Combining expert craftsmanship, modern technology, and high-quality materials, we deliver wellness experiences built to last.
                                </p>
                                <p>
                                    From custom-designed saunas and steam rooms to smart jacuzzis, accessories, and complete maintenance services, our work is guided by one belief — true wellness begins with thoughtful design and precision execution.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Differentiators - Ultra Premium Dark Redesign */}
            <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
                {/* Background Textures */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2a2a2a] rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-gold font-medium tracking-[0.2em] text-sm uppercase mb-4 block">The Gold Standard</span>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Excellence in every <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white/80 to-gold animate-shimmer bg-[length:200%_100%]">detail.</span>
                            </h2>
                        </div>
                        <p className="text-white/40 text-lg font-light max-w-md leading-relaxed mb-2 md:text-right">
                            We don't just build saunas; we engineer wellness sanctuaries. Discover the difference of true craftsmanship.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {differentiators.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.7 }}
                                className="group relative p-10 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    <div className="mb-8 flex items-center justify-between">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-white/20 font-display text-4xl font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-gold transition-colors duration-300">
                                        {item.desc.includes('Expert') ? 'Master Craftsmanship' : item.title}
                                    </h3>
                                    <p className="text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors duration-300">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process - Horizontal Flow */}
            <section className="py-32 bg-charcoal text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-4 block">The Journey</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold">Seamless Execution</h2>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
                            {processSteps.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className={`relative group ${index % 2 === 0 ? 'md:-translate-y-12' : 'md:translate-y-12'}`}
                                >
                                    {/* Vertical Line for Connectors */}
                                    <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] bg-gold/30 h-12 hidden md:block
                                        ${index % 2 === 0 ? 'top-full' : 'bottom-full'}
                                    `} />

                                    {/* Card */}
                                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-white/[0.06] hover:border-gold/30 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1">
                                        <div className="w-12 h-12 rounded-full bg-charcoal border border-gold/30 flex items-center justify-center text-lg font-display text-gold mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(228,180,84,0.1)]">
                                            {item.step}
                                        </div>
                                        <h3 className="font-display text-xl font-semibold mb-3 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/50 text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Commitment - The Artisan's Promise */}
            <section className="relative py-32 bg-[#F9F8F6] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-multiply pointer-events-none" />

                {/* Decorative Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container px-4 text-center max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-12 inline-block relative group"
                    >
                        <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative w-24 h-24 mx-auto border border-gold/30 rounded-full flex items-center justify-center bg-white shadow-lg">
                            <div className="w-20 h-20 border border-gold/20 rounded-full flex items-center justify-center">
                                <Check className="w-8 h-8 text-gold" />
                            </div>
                            <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-30" viewBox="0 0 100 100">
                                <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                <text className="text-[10px] uppercase font-bold tracking-[0.2em] fill-gold">
                                    <textPath href="#curve">
                                        Official • Certified • Premium • Quality •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </motion.div>

                    <h2 className="font-display text-4xl md:text-6xl font-bold mb-10 text-charcoal leading-[1.15]">
                        "More than products, we create <span className="text-gold italic font-serif">sanctuaries</span>. <br className="hidden md:block" />
                        Spaces designed to help you relax, recharge, and reconnect."
                    </h2>

                    <div className="h-px w-24 bg-gold/30 mx-auto mb-10" />

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium tracking-widest text-charcoal/60 uppercase">
                        <span className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Lifetime Warranty
                        </span>
                        <span className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Sustainably Sourced
                        </span>
                        <span className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Ethically Crafted
                        </span>
                    </div>
                </div>
            </section>

            {/* 6. Page CTA */}
            <section className="py-24 bg-active/5 border-t border-active/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">Let's Create Your Wellness Space</h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Ready to bring the spa experience home? Our experts are here to guide you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="xl" variant="gold" asChild className="text-white relative overflow-hidden group">
                            <Link to="/contact">
                                <span className="relative z-10 flex items-center">
                                    Request a Quote <ArrowRight className="ml-2 w-5 h-5" />
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                            </Link>
                        </Button>
                        <Button size="xl" variant="outline" asChild className="bg-transparent hover:text-white">
                            <Link to="/contact">
                                Book Consultation
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
