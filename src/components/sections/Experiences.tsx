import { motion } from 'framer-motion';
import { Flame, Music2, Waves } from 'lucide-react';

const experiences = [
  {
    title: 'The Grill House',
    icon: Flame,
    image: '/images/grill-house-night.jpg',
    description:
      'Our signature restaurant, lit warm against the Lusaka night — open-flame grilling, generous plates, and a setting built for long, unhurried evenings.',
  },
  {
    title: 'The VIP Lounge',
    icon: Music2,
    image: '/images/vip-lounge-jazz.jpg',
    description:
      'A private lounge with a jazz-club atmosphere — low light, live sound, and a space reserved for guests who want the evening to slow down.',
  },
  {
    title: 'The Courtyard Pool',
    icon: Waves,
    image: '/images/pool-poolside.jpg',
    description:
      'A quiet stretch of blue water framed by palms, just steps from your room — open to all guests, day or evening.',
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="py-section-v px-margin-mobile md:px-gutter bg-surface">
      <div className="mx-auto max-w-content">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-caps text-warm-gold mb-4">On the Grounds</p>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-forest-green-deep">
            Beyond the room
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.1 }}
              className={`flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} rounded-xl overflow-hidden ambient-shadow bg-surface-container-lowest`}
            >
              <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
                <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <exp.icon className="text-warm-gold mb-4" size={28} />
                <h3 className="font-display text-headline-md text-forest-green-deep mb-3">{exp.title}</h3>
                <p className="text-body-lg text-on-surface-variant">{exp.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
