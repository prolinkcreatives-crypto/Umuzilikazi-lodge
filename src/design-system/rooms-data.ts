import type { Room } from '../types';

export const roomsData: Room[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    tagline: 'Quiet comfort, considered detail',
    description:
      'A calm, well-appointed room for travelers who want genuine comfort without excess — soft linens, a private en-suite, and the same warm hospitality found throughout the lodge.',
    pricePerNight: 360,
    currency: 'ZMW',
    maxGuests: 2,
    bedConfig: '1 Queen bed',
    amenities: ['Free Wi-Fi', 'En-suite bathroom', 'Daily housekeeping', 'Secure parking'],
    image: '/images/room-standard.jpg',
  },
  {
    id: 'executive',
    name: 'Executive Room',
    tagline: 'The lodge at its most refined',
    description:
      'Our most spacious accommodation — generous proportions, premium furnishings, and thoughtful finishing touches for guests who want the fullest expression of Umuzilikazi hospitality.',
    pricePerNight: 2000,
    currency: 'ZMW',
    maxGuests: 2,
    bedConfig: '1 Queen bed',
    amenities: ['Free Wi-Fi', 'En-suite bathroom', 'Premium linens', 'Daily housekeeping', 'Secure parking', 'Priority reception service'],
    image: '/images/room-executive.jpg',
  },
];
