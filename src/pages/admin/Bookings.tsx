import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Trash2, Phone, MessageCircle, Mail } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useBookingsRecordStore } from '../../store/bookingsRecordStore';
import { formatZmw } from '../../utils/format';
import type { BookingStatus } from '../../types';

const statusStyles: Record<BookingStatus, string> = {
  pending: 'bg-secondary-fixed text-on-secondary-fixed-variant',
  confirmed: 'bg-primary-fixed text-on-primary-fixed-variant',
  cancelled: 'bg-surface-container-highest text-on-surface-variant',
};

const filterOptions: { label: string; value: BookingStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancelled', value: 'cancelled' },
];

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, '');
}

export default function Bookings() {
  const { records, loading, setStatus, removeRecord, fetchRecords } = useBookingsRecordStore();
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const visible = filter === 'all' ? records : records.filter((r) => r.status === filter);

  return (
    <AdminLayout>
      <h1 className="font-display text-headline-lg-mobile text-forest-green-deep mb-1">Bookings</h1>
      <p className="text-body-md text-on-surface-variant mb-6">
        Requests submitted through the website. When you confirm one, use the contact icons to let the guest know directly.
      </p>

      <div className="flex gap-2 mb-6">
        {filterOptions.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`label-caps px-4 py-2 rounded-full border transition-colors ${
              filter === f.value
                ? 'bg-forest-green-deep text-ivory-white border-forest-green-deep'
                : 'border-outline-variant text-on-surface-variant hover:border-forest-green-deep'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-surface-container-lowest rounded-xl p-12 text-center ambient-shadow">
          <p className="text-body-lg text-on-surface-variant">Loading bookings…</p>
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-12 text-center ambient-shadow">
          <p className="text-body-lg text-on-surface-variant">No bookings match this filter.</p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                {['Guest', 'Contact', 'Room', 'Dates', 'Guests', 'Total', 'Status', 'Requested', ''].map((h) => (
                  <th key={h} className="label-caps text-on-surface-variant px-5 py-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id} className="border-b border-outline-variant last:border-0">
                  <td className="px-5 py-4 text-body-md text-on-surface whitespace-nowrap">{r.guestName}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {r.guestPhone && (
                        <>
                          <a
                            href={`tel:${r.guestPhone}`}
                            aria-label={`Call ${r.guestName}`}
                            className="text-on-surface-variant hover:text-forest-green-deep transition-colors"
                          >
                            <Phone size={16} />
                          </a>
                          <a
                            href={`https://wa.me/${digitsOnly(r.guestPhone)}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`WhatsApp ${r.guestName}`}
                            className="text-on-surface-variant hover:text-forest-green-deep transition-colors"
                          >
                            <MessageCircle size={16} />
                          </a>
                        </>
                      )}
                      {r.guestEmail && (
                        <a
                          href={`mailto:${r.guestEmail}?subject=${encodeURIComponent('Your booking at Moselekatse Guesthouse')}&body=${encodeURIComponent(`Hi ${r.guestName}, your booking (${r.roomName}, ${r.checkIn} to ${r.checkOut}) is confirmed.`)}`}
                          aria-label={`Email ${r.guestName}`}
                          className="text-on-surface-variant hover:text-forest-green-deep transition-colors"
                        >
                          <Mail size={16} />
                        </a>
                      )}
                      {!r.guestPhone && !r.guestEmail && (
                        <span className="text-label-sm text-on-surface-variant/50">No contact given</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-body-md text-on-surface-variant whitespace-nowrap">{r.roomName}</td>
                  <td className="px-5 py-4 text-body-md text-on-surface-variant whitespace-nowrap">
                    {r.checkIn} → {r.checkOut} ({r.nights}n)
                  </td>
                  <td className="px-5 py-4 text-body-md text-on-surface-variant">{r.guests}</td>
                  <td className="px-5 py-4 text-body-md text-on-surface whitespace-nowrap">{formatZmw(r.total)}</td>
                  <td className="px-5 py-4">
                    <select
                      value={r.status}
                      onChange={(e) => setStatus(r.id, e.target.value as BookingStatus)}
                      className={`label-caps rounded-full px-3 py-1.5 border-0 ${statusStyles[r.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-label-sm text-on-surface-variant whitespace-nowrap">
                    {format(parseISO(r.createdAt), 'MMM d, HH:mm')}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      aria-label="Remove booking"
                      onClick={() => removeRecord(r.id)}
                      className="text-on-surface-variant hover:text-error transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
