export type RoomId = 'standard' | 'executive';

export interface Room {
  id: RoomId;
  name: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  currency: 'ZMW';
  maxGuests: number;
  bedConfig: string;
  amenities: string[];
  image: string;
}

export interface BookingDraft {
  roomId: RoomId | null;
  checkIn: string | null; // ISO date
  checkOut: string | null; // ISO date
  guests: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface BookingRecord {
  id: string;
  roomId: RoomId;
  roomName: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: number;
  status: BookingStatus;
  createdAt: string; // ISO timestamp
}

export interface Review {
  author: string;
  rating: number;
  quote: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: 'rooms' | 'grounds' | 'grill-house' | 'vip-lounge';
}
