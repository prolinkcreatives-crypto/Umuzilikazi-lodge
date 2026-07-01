import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { lodgeInfo } from '../../design-system/tokens';

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const mapSrc = `https://maps.google.com/maps?q=${lodgeInfo.coordinates.lat},${lodgeInfo.coordinates.lng}&z=16&output=embed`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Umuzilikazi Lodge, my name is ${name || 'a guest'}. ${message}`,
    );
    window.open(`https://wa.me/${lodgeInfo.whatsapp.replace('+', '')}?text=${text}`, '_blank');
  }

  return (
    <section id="contact" className="py-section-v px-margin-mobile md:px-gutter bg-surface">
      <div className="mx-auto max-w-content">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-caps text-warm-gold mb-4">Get in Touch</p>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-forest-green-deep">Visit or Reach Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="rounded-xl overflow-hidden ambient-shadow"
          >
            <iframe
              title="Umuzilikazi Lodge location"
              src={mapSrc}
              className="w-full h-72 md:h-full min-h-[320px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-4 mb-8">
              <p className="flex items-start gap-3 text-body-md text-on-surface-variant">
                <MapPin size={18} className="text-warm-gold mt-0.5 shrink-0" /> {lodgeInfo.address}
              </p>
              <p className="flex items-start gap-3 text-body-md text-on-surface-variant">
                <Phone size={18} className="text-warm-gold mt-0.5 shrink-0" />
                <a href={`tel:${lodgeInfo.phone.replace(/\s/g, '')}`} className="hover:text-forest-green-deep">
                  {lodgeInfo.phone}
                </a>
              </p>
              <p className="flex items-start gap-3 text-body-md text-on-surface-variant">
                <Clock size={18} className="text-warm-gold mt-0.5 shrink-0" /> {lodgeInfo.hours}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              />
              <textarea
                placeholder="How can we help?"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-warm-gold-bright resize-none"
              />
              <button
                type="submit"
                className="label-caps w-full md:w-auto bg-warm-gold text-ivory-white px-8 py-3.5 rounded hover:bg-warm-gold-bright hover:text-forest-green-deep transition-colors"
              >
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
