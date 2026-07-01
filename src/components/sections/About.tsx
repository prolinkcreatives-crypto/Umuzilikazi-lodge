import { motion } from 'framer-motion';
import ShieldDivider from '../ShieldDivider';

export default function About() {
  return (
    <section className="py-section-v px-margin-mobile md:px-gutter bg-surface">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:col-span-5"
          >
            <p className="label-caps text-warm-gold mb-4">A Lusaka Sanctuary</p>
            <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-forest-green-deep mb-6">
              A home, run with care, built on hospitality
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-4">
              Umuzilikazi Lodge sits quietly on its own grounds in Lusaka — a courtyard pool,
              a reception that never closes, and rooms designed for genuine rest rather than
              passing through. Every detail, from the shield at the gate to the linens on the
              bed, is looked after by people who treat the lodge as their own.
            </p>
            <p className="text-body-md text-on-surface-variant">
              We built this place around the idea that comfort and warmth matter more than
              spectacle — and that a guest house can still feel considered, generous, and
              genuinely Zambian.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="md:col-span-7 rounded-xl overflow-hidden ambient-shadow"
          >
            <img
              src="/images/reception-lounge.jpg"
              alt="Umuzilikazi Lodge reception lounge with leather seating"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </motion.div>
        </div>

        <ShieldDivider className="mt-section-v" />
      </div>
    </section>
  );
}
