import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useBookingsRecordStore } from '../../store/bookingsRecordStore';
import { roomsData } from '../../design-system/rooms-data';
import { formatZmw, nightsBetween } from '../../utils/format';
import { lodgeInfo } from '../../design-system/tokens';

export default function BookingWidget() {
  const { roomId, checkIn, checkOut, guests, setRoom, setDates, setGuests } = useBookingStore();
  const addRecord = useBookingsRecordStore((s) => s.addRecord);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const selectedRoom = useMemo(() => roomsData.find((r) => r.id === roomId) ?? roomsData[0], [roomId]);
  const nights = nightsBetween(checkIn, checkOut);
  const total = nights > 0 ? nights * selectedRoom.pricePerNight : 0;

  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut || nights <= 0) return;
    setSubmitting(true);
    setSubmitError('');
    const result = await addRecord({
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      guestName: guestName || 'Guest (name not given)',
      guestPhone,
      guestEmail: guestEmail || null,
      checkIn,
      checkOut,
      guests,
      nights,
      total,
    });
    setSubmitting(false);
    if (result.ok) {
      setConfirmed(true);
    } else {
      setSubmitError(
        result.error ?? "Couldn't save your request right now — please send it via WhatsApp instead.",
      );
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Moselekatse Guesthouse, I'd like to book the ${selectedRoom.name} from ${checkIn} to ${checkOut} (${nights} night${nights === 1 ? '' : 's'}, ${guests} guest${guests === 1 ? '' : 's'}). Estimated total: ${formatZmw(total)}.`,
  );

  return (
    <section id="booking" className="relative -mt-24 md:-mt-28 z-20 px-margin-mobile md:px-gutter">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="glass-panel ambient-shadow rounded-xl mx-auto max-w-content p-6 md:p-10"
      >
        {!confirmed ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-3">
              <label className="label-caps text-on-surface-variant block mb-2 flex items-center gap-2">
                <User size={14} /> Name
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              />
            </div>

            <div className="md:col-span-3">
              <label className="label-caps text-on-surface-variant block mb-2 flex items-center gap-2">
                <Phone size={14} /> Phone
              </label>
              <input
                type="tel"
                required
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+260 9XX XXX XXX"
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              />
            </div>

            <div className="md:col-span-3">
              <label className="label-caps text-on-surface-variant block mb-2 flex items-center gap-2">
                <Mail size={14} /> Email <span className="normal-case text-on-surface-variant/60">(optional)</span>
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              />
            </div>

            <div className="md:col-span-3">
              <label className="label-caps text-on-surface-variant block mb-2">Room</label>
              <select
                value={selectedRoom.id}
                onChange={(e) => setRoom(e.target.value as typeof selectedRoom.id)}
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              >
                {roomsData.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} — {formatZmw(room.pricePerNight)}/night
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="label-caps text-on-surface-variant block mb-2 flex items-center gap-2">
                <Calendar size={14} /> Check in
              </label>
              <input
                type="date"
                required
                min={today}
                value={checkIn ?? ''}
                onChange={(e) => setDates(e.target.value, checkOut)}
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              />
            </div>

            <div className="md:col-span-3">
              <label className="label-caps text-on-surface-variant block mb-2 flex items-center gap-2">
                <Calendar size={14} /> Check out
              </label>
              <input
                type="date"
                required
                min={checkIn ?? today}
                value={checkOut ?? ''}
                onChange={(e) => setDates(checkIn, e.target.value)}
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              />
            </div>

            <div className="md:col-span-3">
              <label className="label-caps text-on-surface-variant block mb-2 flex items-center gap-2">
                <Users size={14} /> Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-soft-beige border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-warm-gold-bright"
              >
                {[1, 2].map((g) => (
                  <option key={g} value={g}>
                    {g} guest{g > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={nights <= 0 || submitting}
                className="w-full label-caps bg-warm-gold disabled:bg-outline-variant disabled:cursor-not-allowed text-ivory-white px-4 py-3.5 rounded hover:bg-warm-gold-bright hover:text-forest-green-deep transition-colors"
              >
                {submitting ? '…' : 'Check'}
              </button>
            </div>

            {submitError && (
              <div className="md:col-span-12 -mt-2">
                <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-3">
                  <p className="label-caps text-error mb-2">Couldn't save this request — technical detail below</p>
                  <p className="font-mono text-[11px] leading-relaxed text-on-surface-variant break-words whitespace-pre-wrap">
                    {submitError}
                  </p>
                </div>
                <a
                  href={`https://wa.me/${lodgeInfo.whatsapp.replace('+', '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="label-caps text-warm-gold underline"
                >
                  Send this request via WhatsApp instead
                </a>
              </div>
            )}

            {nights > 0 && (
              <div className="md:col-span-12 pt-4 border-t border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-body-md text-on-surface-variant">
                  {nights} night{nights > 1 ? 's' : ''} · {selectedRoom.name}
                </span>
                <span className="font-display text-headline-md text-forest-green-deep">
                  {formatZmw(total)} <span className="text-body-md text-on-surface-variant font-body">estimated total</span>
                </span>
              </div>
            )}
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <CheckCircle2 className="mx-auto text-forest-green mb-4" size={40} />
            <h3 className="font-display text-headline-md text-forest-green-deep mb-2">Request received</h3>
            <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-6">
              {selectedRoom.name}, {checkIn} → {checkOut} ({nights} night{nights > 1 ? 's' : ''}), {guests} guest{guests > 1 ? 's' : ''}.
              Estimated total {formatZmw(total)}. Reception has this request and will reach out on the phone
              number you gave to confirm — for the fastest reply, send it over WhatsApp too.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${lodgeInfo.whatsapp.replace('+', '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="label-caps bg-warm-gold text-ivory-white px-6 py-3 rounded hover:bg-warm-gold-bright hover:text-forest-green-deep transition-colors"
              >
                Send via WhatsApp
              </a>
              <button
                onClick={() => setConfirmed(false)}
                className="label-caps border border-outline-variant px-6 py-3 rounded text-on-surface-variant hover:bg-soft-beige transition-colors"
              >
                Edit details
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
                }
