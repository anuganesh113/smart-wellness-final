import { motion } from 'framer-motion';
import { Layout } from '@/components/layout';
import heroCinematic from '@/assets/hero-cinematic.jpg';
import { Shield, Lock, Eye, FileText, Server, Globe } from 'lucide-react';

const sections = [
    {
        icon: Eye,
        title: "Information Collection",
        content: "We collect information that you provide directly to us when you request a consultation, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and architectural preferences."
    },
    {
        icon: Server,
        title: "How We Use Your Data",
        content: "Your information is meticulously used to tailor our wellness solutions to your specific needs. We strictly use your data for processing consultations, improving our bespoke services, and communicating relevant updates about our craftsmanship."
    },
    {
        icon: Lock,
        title: "Data Protection",
        content: "We employ state-of-the-art security measures to protect your personal information. Your data is encrypted and stored on secure servers, accessible only to authorized personnel committed to strict confidentiality agreements."
    },
    {
        icon: Globe,
        title: "Third-Party Sharing",
        content: "We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners."
    }
];

const PrivacyPolicy = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroCinematic}
                        alt="Privacy & Security"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-[#050505]/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="inline-block text-gold/90 font-medium text-sm md:text-base uppercase tracking-[0.2em] mb-6">
                            Legal & Trust
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Privacy Policy
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">

                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-20 text-center"
                    >
                        <Shield className="w-12 h-12 text-gold mx-auto mb-6 opacity-80" />
                        <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto">
                            At Smart Wellness, we believe that trust is the foundation of luxury.
                            We are dedicated to protecting your privacy with the same attention to detail
                            that we apply to our craftsmanship.
                        </p>
                    </motion.div>

                    {/* Policy Grid */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-xl hover:shadow-gold/5 hover:border-gold/30 transition-all duration-500"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="p-3 rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform duration-500 shrink-0">
                                        <section.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-neutral-900 mb-3 group-hover:text-gold transition-colors">
                                            {section.title}
                                        </h3>
                                        <p className="text-neutral-500 leading-relaxed font-light">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Last Updated */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-20 pt-10 border-t border-neutral-100 text-center"
                    >
                        <p className="text-neutral-400 text-sm font-light">
                            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                        <p className="text-neutral-400 text-sm mt-4 font-light">
                            For any privacy-related inquiries, please contact us at <a href="mailto:cbschandrashrestha@gmail.com" className="text-gold hover:underline">cbschandrashrestha@gmail.com</a>
                        </p>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default PrivacyPolicy;
