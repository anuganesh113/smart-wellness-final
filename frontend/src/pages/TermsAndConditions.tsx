import { motion } from 'framer-motion';
import { Layout } from '@/components/layout';
import heroCinematic from '@/assets/hero-cinematic.jpg';
import { Scale, FileText, AlertCircle, Globe } from 'lucide-react';

const sections = [
    {
        icon: FileText,
        title: "Agreement to Terms",
        content: "By accessing our website and engaging with our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the service."
    },
    {
        icon: Scale,
        title: "Intellectual Property",
        content: "The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights."
    },
    {
        icon: AlertCircle,
        title: "Limitation of Liability",
        content: "In no event shall Smart Wellness, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits."
    },
    {
        icon: Globe,
        title: "Governing Law",
        content: "These Terms shall be governed and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
    }
];

const TermsAndConditions = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroCinematic}
                        alt="Terms & Conditions"
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
                            Legal
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Terms & Conditions
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
                        <Scale className="w-12 h-12 text-gold mx-auto mb-6 opacity-80" />
                        <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto">
                            Please read these terms and conditions carefully before using our service.
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
                            For any inquiries, please contact us at <a href="mailto:cbschandrashrestha@gmail.com" className="text-gold hover:underline">cbschandrashrestha@gmail.com</a>
                        </p>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default TermsAndConditions;
