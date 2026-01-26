import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroCinematic from '@/assets/hero-cinematic.jpg';
import { createInquiry } from '@/services/api';

const projectTypes = [
  'Sauna Installation',
  'Steam Room',
  'Jacuzzi / Hot Tub',
  'Custom Solution',
  'Repair & Maintenance',
  'Accessories',
  'Other',
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        productRef: formData.projectType, // Mapping projectType to productRef
      });

      toast({
        title: 'Request Received',
        description: 'Our concierge team will contact you within 24 hours.',
      });

      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Please try again later or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* Hero Section - Immersive Cinematic */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroCinematic}
            alt="Luxury wellness space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block text-gold/90 font-medium text-sm md:text-base uppercase tracking-[0.2em] mb-6">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Begin Your <br />
              <span className="text-white/90">Wellness Journey</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're planning a new sanctuary or enhancing an existing one, our expert team is here to guide you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Split Layout */}
      <section className="py-20 lg:py-32 bg-[#050505] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-10"
            >
              <div>
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-white/60 leading-relaxed text-lg font-light">
                  Our showroom is open for visits by appointment. Experience our materials and craftsmanship firsthand.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", value: "+977-9851004505", sub: "Mon-Fri, 9am-6pm", href: "tel:+9779851004505" },
                  { icon: Mail, title: "Email", value: "cbschandrashrestha@gmail.com", sub: "24/7 Digital Support", href: "mailto:cbschandrashrestha@gmail.com" },
                  { icon: MapPin, title: "Showroom", value: "Dhapakhel, Lalitpur", sub: "Visit by Appointment", href: "https://maps.google.com" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-white font-semibold text-lg mb-1 group-hover:text-gold transition-colors">{item.title}</h3>
                      <p className="text-white/80 font-medium mb-1">{item.value}</p>
                      <p className="text-white/40 text-sm">{item.sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-charcoal to-black border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="font-display text-2xl font-bold text-white mb-3 relative z-10">Quick Question?</h3>
                <p className="text-white/60 mb-6 relative z-10">Chat directly with our design consultants on WhatsApp for immediate assistance.</p>

                <Button variant="gold" className="w-full relative overflow-hidden group/btn" asChild>
                  <a href="https://wa.me/9779851004505" target="_blank" rel="noopener noreferrer">
                    <span className="relative z-10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Right Column: Premium Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-bold text-white mb-2">Request Consultation</h2>
                  <p className="text-white/50">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="relative group">
                      <label
                        htmlFor="name"
                        className={`absolute left-0 transition-all duration-300 ${activeField === 'name' || formData.name ? '-top-6 text-xs text-gold' : 'top-3 text-white/40'
                          }`}
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 h-auto text-white placeholder-transparent focus:border-gold focus:ring-0 transition-colors"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <label
                        htmlFor="email"
                        className={`absolute left-0 transition-all duration-300 ${activeField === 'email' || formData.email ? '-top-6 text-xs text-gold' : 'top-3 text-white/40'
                          }`}
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 h-auto text-white placeholder-transparent focus:border-gold focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Phone */}
                    <div className="relative group">
                      <label
                        htmlFor="phone"
                        className={`absolute left-0 transition-all duration-300 ${activeField === 'phone' || formData.phone ? '-top-6 text-xs text-gold' : 'top-3 text-white/40'
                          }`}
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setActiveField('phone')}
                        onBlur={() => setActiveField(null)}
                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 h-auto text-white placeholder-transparent focus:border-gold focus:ring-0 transition-colors"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="relative group">
                      <label
                        htmlFor="projectType"
                        className="absolute -top-6 left-0 text-xs text-white/40 group-hover:text-gold transition-colors"
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus:border-gold focus:ring-0 focus:outline-none transition-colors appearance-none [&_option]:bg-charcoal"
                        required
                      >
                        <option value="" disabled selected>Select an option</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative group">
                    <label
                      htmlFor="message"
                      className={`absolute left-0 transition-all duration-300 ${activeField === 'message' || formData.message ? '-top-6 text-xs text-gold' : 'top-3 text-white/40'
                        }`}
                    >
                      Project Details
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 min-h-[100px] text-white placeholder-transparent focus:border-gold focus:ring-0 transition-colors resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="xl"
                    className="w-full mt-8 relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          Send Request
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 z-0" />
                  </Button>

                  <p className="text-center text-white/30 text-xs">
                    By submitting field form, you agree to our privacy policy. Your information is kept strictly confidential.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="h-[500px] relative bg-neutral-900 border-t border-white/5">
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
          {/* 
                In a real app, embed Google Maps iframe here with grayscale filter
                filter: grayscale(100%) invert(92%) contrast(83%);
            */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.924577239103!2d85.32168965!3d27.65345725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb176655c696e1%3A0xe7444c9b1b7a6962!2sDhapakhel%2C%20Lalitpur%2044700!5e0!3m2!1sen!2snp!4v1642938478952!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) invert(100%) contrast(100%) brightness(100%)' }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>

          <div className="absolute inset-0 pointer-events-none border-t border-b border-white/5 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
