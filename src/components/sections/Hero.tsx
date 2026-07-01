import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { lodgeInfo } from '../../design-system/tokens';

const headlineWords = lodgeInfo.tagline.split(' ');

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end overflow-hidden bg-forest-green-deep">
      {/* Real property photo, not stock imagery */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-night-facade.jpg"
          alt="Umuzilikazi Lodge reception entrance at night, warmly lit"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-green-deep via-forest-green-deep/40 to-forest-green-deep/10" />
        <div className="absolute inset-0 bg-forest-green-deep/20" />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-content px-margin-mobile md:px-gutter pb-28 md:pb-36 pt-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="label-caps text-warm-gold-bright mb-6"
        >
          Lusaka, Zambia
        </motion.p>

        <h1 className="font-display text-headline-lg-mobile md:text-display-lg text-ivory-white leading-[1.1] max-w-3xl overflow-hidden">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-3 last:mr-0">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="font-body text-body-lg text-ivory-white/75 max-w-xl mt-6"
        >
          A boutique sanctuary in the heart of Lusaka — refined rooms, the Grill House,
          and the VIP Lounge, all gathered around a quiet courtyard pool.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#booking"
            className="label-caps bg-warm-gold text-ivory-white px-8 py-4 rounded hover:bg-warm-gold-bright hover:text-forest-green-deep transition-colors"
          >
            Book Now
          </a>
          <a
            href="#rooms"
            className="label-caps border border-ivory-white/40 text-ivory-white px-8 py-4 rounded hover:bg-ivory-white/10 transition-colors"
          >
            Explore Rooms
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-ivory-white/60"
        aria-hidden="true"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
