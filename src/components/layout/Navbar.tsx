import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ShieldMark from '../ShieldMark';
import { lodgeInfo } from '../../design-system/tokens';

const NAV_LINKS = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? 'glass-panel shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-content px-margin-mobile md:px-gutter h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <ShieldMark
            className={`h-9 w-auto transition-colors ${
              scrolled ? 'text-forest-green-deep' : 'text-ivory-white'
            }`}
          />
          <span
            className={`font-display text-lg tracking-wide transition-colors ${
              scrolled ? 'text-forest-green-deep' : 'text-ivory-white'
            }`}
          >
            {lodgeInfo.name}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`label-caps relative pb-1 transition-colors ${
                  scrolled ? 'text-on-surface-variant hover:text-forest-green-deep' : 'text-ivory-white/85 hover:text-ivory-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className={`hidden md:inline-flex label-caps px-6 py-3 rounded transition-all ${
            scrolled
              ? 'bg-warm-gold text-ivory-white hover:bg-warm-gold-bright hover:text-forest-green-deep'
              : 'bg-ivory-white/10 border border-ivory-white/40 text-ivory-white hover:bg-ivory-white hover:text-forest-green-deep'
          }`}
        >
          Book Now
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={`md:hidden ${scrolled ? 'text-forest-green-deep' : 'text-ivory-white'}`}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-panel overflow-hidden"
          >
            <ul className="flex flex-col px-margin-mobile py-6 gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="label-caps text-on-surface-variant"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  onClick={() => setMobileOpen(false)}
                  className="label-caps inline-block bg-warm-gold text-ivory-white px-6 py-3 rounded"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
