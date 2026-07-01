import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookingDraft, RoomId } from '../types';

interface BookingState extends BookingDraft {
  setRoom: (roomId: RoomId) => void;
  setDates: (checkIn: string | null, checkOut: string | null) => void;
  setGuests: (guests: number) => void;
  reset: () => void;
}

const initialDraft: BookingDraft = {
  roomId: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
};

/**
 * Placeholder persistence via localStorage. Replace with a real backend +
 * PayChangu integration before this goes to production — see README.
 */
export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialDraft,
      setRoom: (roomId) => set({ roomId }),
      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setGuests: (guests) => set({ guests }),
      reset: () => set(initialDraft),
    }),
    { name: 'umuzilikazi-booking-draft' },
  ),
);
