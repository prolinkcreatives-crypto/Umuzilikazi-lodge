import { motion } from 'framer-motion';
import { Wifi, Car, WashingMachine, Clock, Waves, ShieldCheck } from 'lucide-react';

const amenities = [
  { icon: Waves, label: 'Courtyard pool' },
  { icon: Wifi, label: 'Free Wi-Fi throughout' },
  { icon: Car, label: 'Secure parking' },
  { icon: WashingMachine, label: 'Laundry service' },
  { icon: Clock, label: '24-hour reception' },
  { icon: ShieldCheck, label: 'Secure, gated grounds' },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-section-v px-margin-mobile md:px-gutter bg-forest-green-deep text-ivory-white">
      <div className="mx-auto max-w-content">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-caps text-warm-gold-bright mb-4">Every Stay Includes</p>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg">Amenities</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {amenities.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-panel-dark rounded-lg p-6 flex flex-col items-center text-center gap-3"
            >
              <a.icon className="text-warm-gold-bright" size={26} />
              <span className="text-body-md text-ivory-white/85">{a.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
