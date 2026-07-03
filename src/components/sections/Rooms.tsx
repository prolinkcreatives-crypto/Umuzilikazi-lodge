import { motion } from 'framer-motion';
import { Wifi, BedDouble, Users, ShieldCheck } from 'lucide-react';
import { roomsData } from '../../design-system/rooms-data';
import { formatZmw } from '../../utils/format';
import { useBookingStore } from '../../store/bookingStore';

export default function Rooms() {
  const setRoom = useBookingStore((s) => s.setRoom);

  return (
    <section id="rooms" className="py-section-v px-margin-mobile md:px-gutter bg-soft-beige">
      <div className="mx-auto max-w-content">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-caps text-warm-gold mb-4">Accommodation</p>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-forest-green-deep mb-4">
            Two rooms, one standard of care
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Whichever you choose, the comfort is the same — only the size and finishing change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roomsData.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.1 }}
              className="group bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow hover:shadow-xl transition-shadow duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={room.image}
                  alt={`${room.name} at Moselekatse Guesthouse`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 glass-panel rounded px-3 py-1.5">
                  <span className="font-display text-body-lg text-forest-green-deep">{formatZmw(room.pricePerNight)}</span>
                  <span className="text-label-sm text-on-surface-variant">/night</span>
                </div>
              </div>

              <div className="p-7">
                <h3 className="font-display text-headline-md text-forest-green-deep mb-1">{room.name}</h3>
                <p className="label-caps text-warm-gold mb-4">{room.tagline}</p>
                <p className="text-body-md text-on-surface-variant mb-6">{room.description}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-on-surface-variant text-label-sm">
                  <span className="flex items-center gap-2"><BedDouble size={16} /> {room.bedConfig}</span>
                  <span className="flex items-center gap-2"><Users size={16} /> Up to {room.maxGuests} guests</span>
                  <span className="flex items-center gap-2"><Wifi size={16} /> Free Wi-Fi</span>
                </div>

                <ul className="grid grid-cols-2 gap-2 mb-7">
                  {room.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-body-md text-on-surface-variant">
                      <ShieldCheck size={14} className="text-forest-green shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  onClick={() => setRoom(room.id)}
                  className="label-caps inline-flex w-full justify-center bg-forest-green-deep text-ivory-white px-6 py-3.5 rounded hover:bg-warm-gold transition-colors"
                >
                  Book {room.name}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
