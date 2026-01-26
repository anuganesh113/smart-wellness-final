import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Custom Solutions', path: '/custom-solutions' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Smart Wellness Logo"
                className={`w-auto transition-all duration-500 ${isScrolled ? 'h-[5rem]' : 'h-[8rem]'}`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative group ${(isScrolled || !['/', '/custom-solutions', '/about', '/contact'].includes(location.pathname))
                    ? location.pathname === link.path
                      ? 'text-secondary font-semibold'
                      : 'text-secondary hover:text-secondary/80'
                    : location.pathname === link.path
                      ? 'text-white'
                      : 'text-white hover:text-white/80'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-secondary' : 'bg-accent'} ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+977-9851004505" className={`flex items-center gap-2 text-sm transition-colors ${(isScrolled || !['/', '/custom-solutions', '/about', '/contact'].includes(location.pathname)) ? 'text-secondary hover:text-secondary/80' : 'text-white hover:text-white/80'}`}>
                <Phone className="w-4 h-4" />
                <span>+977-9851004505</span>
              </a>
              <Button variant={(isScrolled || !['/', '/custom-solutions', '/about', '/contact'].includes(location.pathname)) ? 'gold' : 'hero'} size="sm" className="text-white" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${(isScrolled || !['/', '/custom-solutions', '/about', '/contact'].includes(location.pathname)) ? 'text-secondary hover:bg-muted' : 'text-white hover:bg-white/10'
                }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
            <div className="relative pt-24 px-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-3 text-lg font-medium transition-colors ${location.pathname === link.path
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4"
                >
                  <Button variant="gold" size="lg" className="w-full" asChild>
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
