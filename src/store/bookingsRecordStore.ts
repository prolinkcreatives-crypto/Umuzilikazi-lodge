import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import type { BookingRecord, BookingStatus } from '../types';

interface DbBookingRow {
  id: string;
  room_id: BookingRecord['roomId'];
  room_name: string;
  guest_name: string;
  guest_phone: string | null;
  guest_email: string | null;
  check_in: string;
  check_out: string;
  guests: number;
  nights: number;
  total: number;
  status: BookingStatus;
  created_at: string;
}

function fromRow(row: DbBookingRow): BookingRecord {
  return {
    id: row.id,
    roomId: row.room_id,
    roomName: row.room_name,
    guestName: row.guest_name,
    guestPhone: row.guest_phone ?? '',
    guestEmail: row.guest_email,
    checkIn: row.check_in,
    checkOut: row.check_out,
    guests: row.guests,
    nights: row.nights,
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  };
}

interface BookingsRecordState {
  records: BookingRecord[];
  loading: boolean;
  error: string | null;
  fetchRecords: () => Promise<void>;
  addRecord: (record: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => Promise<{ ok: boolean; error?: string }>;
  setStatus: (id: string, status: BookingStatus) => Promise<void>;
  removeRecord: (id: string) => Promise<void>;
}

export const useBookingsRecordStore = create<BookingsRecordState>()((set, get) => ({
  records: [],
  loading: false,
  error: null,

  fetchRecords: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }
    set({ records: (data as DbBookingRow[]).map(fromRow), loading: false });
  },

  addRecord: async (record) => {
    const { error } = await supabase.from('bookings').insert({
      room_id: record.roomId,
      room_name: record.roomName,
      guest_name: record.guestName,
      guest_phone: record.guestPhone,
      guest_email: record.guestEmail || null,
      check_in: record.checkIn,
      check_out: record.checkOut,
      guests: record.guests,
      nights: record.nights,
      total: record.total,
      status: 'pending',
    });

    if (error) {
      const parts = [
        `Message: ${error.message}`,
        error.details ? `Details: ${error.details}` : null,
        error.hint ? `Hint: ${error.hint}` : null,
        error.code ? `Code: ${error.code}` : null,
      ].filter(Boolean);
      return { ok: false, error: parts.join(' | ') };
    }
    return { ok: true };
  },

  setStatus: async (id, status) => {
    const previous = get().records;
    set({ records: previous.map((r) => (r.id === id ? { ...r, status } : r)) });

    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) {
      set({ records: previous, error: error.message });
    }
  },

  removeRecord: async (id) => {
    const previous = get().records;
    set({ records: previous.filter((r) => r.id !== id) });

    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) {
      set({ records: previous, error: error.message });
    }
  },
}));
