import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '@/assets/logo.png';

const footerLinks = {
  products: [
    { name: 'Sauna Products', path: '/products' },
    { name: 'Steam Rooms', path: '/products' },
    { name: 'Smart Jacuzzis', path: '/products' },
    { name: 'Accessories', path: '/products' },
  ],
  services: [
    { name: 'Custom Solutions', path: '/custom-solutions' },
    { name: 'Maintenance', path: '/services' },
    { name: 'Installation', path: '/services' },
    { name: 'Repairs', path: '/services' },
  ],
  company: [
    { name: 'About Us', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0f1115] text-cream/80 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,180,84,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="inline-block mb-8 group relative">
              <div className="absolute -inset-4 bg-gold/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={logo}
                alt="Smart Wellness Logo"
                className="h-[7rem] w-auto relative brightness-90 group-hover:brightness-100 transition-all duration-500"
              />
            </Link>
            <p className="text-cream/60 mb-10 max-w-sm leading-relaxed font-light text-base tracking-wide">
              Crafting premium wellness sanctuaries where luxury meets tranquility.
              Transform your daily ritual with our bespoke saunas and steam rooms.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full border border-white/5 bg-white/5 flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <social.icon className="w-4 h-4 text-cream/60 group-hover:text-charcoal relative z-10 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer (Span 1) */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns (Span 2 each) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg font-medium text-white mb-8 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-12 h-[1px] bg-gold/50" />
            </h4>
            <ul className="space-y-5">
              {footerLinks.products.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/60 hover:text-gold transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full border border-white/20 group-hover:border-gold group-hover:bg-gold transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg font-medium text-white mb-8 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-12 h-[1px] bg-gold/50" />
            </h4>
            <ul className="space-y-5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/60 hover:text-gold transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full border border-white/20 group-hover:border-gold group-hover:bg-gold transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg font-medium text-white mb-8 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-[1px] bg-gold/50" />
            </h4>

            <div className="space-y-6">
              <div className="flex items-start gap-5 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/5">
                <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold text-gold group-hover:text-charcoal transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 font-medium">Call Us</div>
                  <a href="tel:+977-9851004505" className="text-cream/90 hover:text-gold transition-colors block font-display text-lg tracking-wide">
                    +977-9851004505
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/5">
                <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold text-gold group-hover:text-charcoal transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 font-medium">Email Us</div>
                  <a href="mailto:cbschandrashrestha@gmail.com" className="text-cream/90 hover:text-gold transition-colors block text-base font-light">
                    cbschandrashrestha@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/5">
                <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold text-gold group-hover:text-charcoal transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 font-medium">Visit Us</div>
                  <span className="text-cream/90 font-light block">
                    Dhapakhel, Lalitpur
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar separator */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-cream/40 text-sm font-light tracking-wide">
            © {new Date().getFullYear()} Smart Wellness. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/" className="text-cream/40 hover:text-gold text-sm transition-colors font-light hover:underline underline-offset-4 decoration-gold/50">
              Terms & Conditions
            </Link>
            <Link to="/" className="text-cream/40 hover:text-gold text-sm transition-colors font-light hover:underline underline-offset-4 decoration-gold/50">
              Privacy Policy
            </Link>
            <Link to="/" className="text-cream/40 hover:text-gold text-sm transition-colors font-light hover:underline underline-offset-4 decoration-gold/50">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
