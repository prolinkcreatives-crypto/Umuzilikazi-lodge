import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../../types';

const images: GalleryImage[] = [
  { src: '/images/hero-night-facade.jpg', alt: 'Guesthouse entrance at night', category: 'grounds' },
  { src: '/images/reception-lounge.jpg', alt: 'Reception lounge seating', category: 'grounds' },
  { src: '/images/reception-aquarium.jpg', alt: 'Reception aquarium feature', category: 'grounds' },
  { src: '/images/pool-poolside.jpg', alt: 'Courtyard pool', category: 'grounds' },
  { src: '/images/room-standard.jpg', alt: 'Standard room', category: 'rooms' },
  { src: '/images/room-executive.jpg', alt: 'Executive room', category: 'rooms' },
  { src: '/images/room-standard-detail.jpg', alt: 'Room detail', category: 'rooms' },
  { src: '/images/grill-house-night.jpg', alt: 'Grill House sign at night', category: 'grill-house' },
  { src: '/images/grill-house-day.jpg', alt: 'Grill House exterior by day', category: 'grill-house' },
  { src: '/images/vip-lounge-jazz.jpg', alt: 'VIP Lounge entrance', category: 'vip-lounge' },
];

const filters: { label: string; value: GalleryImage['category'] | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Rooms', value: 'rooms' },
  { label: 'Grounds', value: 'grounds' },
  { label: 'Grill House', value: 'grill-house' },
  { label: 'VIP Lounge', value: 'vip-lounge' },
];

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]['value']>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = filter === 'all' ? images : images.filter((img) => img.category === filter);

  function openAt(src: string) {
    const idx = visible.findIndex((img) => img.src === src);
    setLightboxIndex(idx);
  }

  function step(delta: number) {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + delta + visible.length) % visible.length);
  }

  return (
    <section id="gallery" className="py-section-v px-margin-mobile md:px-gutter bg-surface">
      <div className="mx-auto max-w-content">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-caps text-warm-gold mb-4">In Pictures</p>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-forest-green-deep">Gallery</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`label-caps px-5 py-2.5 rounded-full border transition-colors ${
                filter === f.value
                  ? 'bg-forest-green-deep text-ivory-white border-forest-green-deep'
                  : 'border-outline-variant text-on-surface-variant hover:border-forest-green-deep'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {visible.map((img) => (
            <motion.button
              key={img.src}
              onClick={() => openAt(img.src)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 block w-full overflow-hidden rounded-lg group"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-forest-green-deep/95 flex items-center justify-center p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              aria-label="Close gallery"
              className="absolute top-6 right-6 text-ivory-white/80 hover:text-ivory-white"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={28} />
            </button>
            <button
              aria-label="Previous image"
              className="absolute left-4 md:left-10 text-ivory-white/70 hover:text-ivory-white"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              <ChevronLeft size={32} />
            </button>
            <motion.img
              key={visible[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              src={visible[lightboxIndex].src}
              alt={visible[lightboxIndex].alt}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              aria-label="Next image"
              className="absolute right-4 md:right-10 text-ivory-white/70 hover:text-ivory-white"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
