import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Wrench,
  AlertTriangle,
  Settings,
  Clock,
  Shield,
  CheckCircle2,
  Phone
} from 'lucide-react';
import maintenanceImage from '@/assets/maintenance.jpg';

const services = [
  {
    icon: Clock,
    title: 'Routine Maintenance',
    description: 'Regular inspections and preventive care to keep your sauna or steam room performing at its best. Includes deep cleaning, seal checks, and component testing.',
    features: ['Annual Inspection', 'Deep Cleaning', 'Seal & Gasket Check', 'Performance Testing'],
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Repairs',
    description: 'Available 24/7 for urgent issues. Our certified technicians can diagnose and resolve most problems within the same day to minimize downtime.',
    features: ['24/7 Availability', 'Same-Day Service', 'Certified Technicians', 'All Brands'],
  },
  {
    icon: Settings,
    title: 'Upgrades & Parts',
    description: 'Modernize your existing installation with smart controls, new heaters, LED lighting, or replacement parts from top manufacturers.',
    features: ['Smart Controls', 'Heater Upgrades', 'LED Systems', 'Genuine Parts'],
  },
];

const benefits = [
  { icon: Shield, text: '2-Year Warranty on All Repairs' },
  { icon: CheckCircle2, text: 'Factory-Trained Technicians' },
  { icon: Wrench, text: 'Genuine OEM Parts' },
  { icon: Clock, text: 'Flexible Scheduling' },
];

const ServicesPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">
                Repair & Maintenance
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Expert Care for Your
                <span className="text-accent"> Wellness Space</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Protect your investment with professional maintenance and repair services.
                Our certified technicians service all brands and models with genuine parts
                and industry-leading warranties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="xl" asChild className="text-white relative overflow-hidden group">
                  <Link to="/contact">
                    <span className="relative z-10 flex items-center">
                      Schedule Service
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild className="hover:text-white">
                  <a href="tel:+977-9851004505">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Line
                  </a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={maintenanceImage}
                alt="Professional sauna maintenance team"
                className="w-full rounded-2xl shadow-large"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services - Minimalist Luxury */}
      <section className="py-32 bg-[#F9F8F6] relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-[1px] w-8 bg-gold/60" />
              <span className="text-gold font-medium text-xs uppercase tracking-[0.25em]">Our Expertise</span>
              <span className="h-[1px] w-8 bg-gold/60" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6"
            >
              Comprehensive Care <br />
              <span className="italic font-light text-muted-foreground">for your sanctuary.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 log:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative bg-white h-full p-8 lg:p-12 rounded-t-[40px] rounded-b-[4px] shadow-sm hover:shadow-2xl transition-all duration-500 border-b-4 border-transparent hover:border-gold"
              >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent group-hover:via-gold/30 transition-colors duration-500" />

                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F0] group-hover:bg-gold/10 flex items-center justify-center mb-10 transition-colors duration-500">
                  <service.icon className="w-8 h-8 text-charcoal group-hover:text-gold transition-colors duration-500" />
                </div>

                <h3 className="font-display text-2xl font-bold text-charcoal mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-8 leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="space-y-4 border-t border-black/5 pt-8 group-hover:border-gold/20 transition-colors duration-500">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-charcoal/80 group-hover:text-charcoal transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals - Glass Ribbon */}
      <section className="py-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-display font-medium text-white/90 text-lg group-hover:text-gold transition-colors duration-300 max-w-[150px]">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Plans - Executive Membership */}
      <section className="py-24 bg-[#F5F5F0]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-4">
                The Privilege Program
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
                Uncompromising <br />
                <span className="text-[#a4a096]">Performance.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light max-w-lg">
                Your wellness sanctuary is an investment in your quality of life. Our membership ensures it remains in pristine condition, year after year, without you lifting a finger.
              </p>

              <ul className="space-y-5 mb-10">
                {[
                  'Priority 24/7 VIP Support Line',
                  'Comprehensive Annual System Diagnostics',
                  '15% Member Advantage on Upgrades',
                  'Fully Transferable Ownership Rights',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <span className="text-charcoal/80 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <Button variant="outline" size="xl" className="border-charcoal/20 hover:border-charcoal text-charcoal hover:bg-charcoal hover:text-white" asChild>
                <Link to="/contact">
                  Inquire About Membership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* Right: The "Black Card" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-[#1a1a1a] rounded-[32px] p-10 md:p-12 overflow-hidden shadow-2xl border border-white/5 group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4" />

                <div className="absolute top-8 right-8">
                  <div className="w-12 h-8 border border-white/20 rounded mix-blend-overlay opacity-50" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-display text-3xl font-bold text-white mb-2">
                    Platinum Care
                  </h3>
                  <p className="text-white/40 text-sm tracking-widest uppercase mb-12">Annual Membership</p>

                  <div className="flex items-baseline gap-1 mb-12">
                    <span className="text-xl text-gold font-light">Rs.</span>
                    <span className="text-6xl font-display font-medium text-white bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/70">10,000</span>
                    <div className="flex flex-col ml-3">
                      <span className="text-white/50 text-sm font-medium">per year</span>
                      <span className="text-white/30 text-[10px] tracking-wider uppercase">Billed Annually</span>
                    </div>
                  </div>

                  <div className="space-y-6 mb-12 border-t border-white/5 pt-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Response Time</span>
                      <span className="text-white font-medium">Under 4 Hours</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Parts Coverage</span>
                      <span className="text-white font-medium">Included</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Scheduled Visits</span>
                      <span className="text-white font-medium">2x / Year</span>
                    </div>
                  </div>

                  <Button variant="gold" size="xl" className="w-full h-16 text-lg shadow-[0_0_20px_rgba(228,180,84,0.2)] hover:shadow-[0_0_30px_rgba(228,180,84,0.4)] text-white relative overflow-hidden group" asChild>
                    <Link to="/contact">
                      <span className="relative z-10">Activate Membership</span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Back Glow */}
              <div className="absolute inset-0 bg-gold/20 rounded-[32px] blur-[40px] -z-10 scale-[0.85] translate-y-8" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Concierge Dispatch */}
      <section className="relative py-24 bg-[#0a0a0a] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-8 animate-pulse"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Rapid Response Unit</span>
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Immediate Assistance Required?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto font-light">
            Our specialized technicians are on standby 24/7. <br className="hidden md:block" />
            For non-critical maintenance, enjoy priority scheduling online.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button variant="default" size="xl" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-[0_0_30px_rgba(220,38,38,0.3)] min-w-[200px]" asChild>
              <a href="https://wa.me/9779851004505" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-3" />
                Emergency Dispatch
              </a>
            </Button>

            <Button variant="outline" size="xl" className="border-white/10 text-white hover:bg-white/10 hover:text-white min-w-[200px]" asChild>
              <Link to="/contact">
                Schedule Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
