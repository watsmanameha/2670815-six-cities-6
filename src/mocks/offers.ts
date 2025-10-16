export type Offer = {
  id: string;
  title: string;
  type: 'Apartment' | 'Room' | 'House' | 'Studio';
  price: number; // per night
  rating: number; // 0..5
  isPremium?: boolean;
  isBookmarked?: boolean;
  city: string;
  previewImage: string;
  images?: string[];
  bedrooms?: number;
  maxAdults?: number;
  description?: string;
  goods?: string[];
  host?: {
    id: string;
    name: string;
    isPro?: boolean;
    avatarUrl?: string;
  };
  location?: {
    latitude: number;
    longitude: number;
    zoom?: number;
  };
};

export const OFFERS: Offer[] = [
  {
    id: 'offer-1',
    title: 'Cozy studio in the heart of Amsterdam',
    type: 'Studio',
    price: 90,
    rating: 4.5,
    isPremium: false,
    isBookmarked: false,
    city: 'Amsterdam',
    previewImage: 'img/studio-01.jpg',
    images: ['img/studio-01.jpg', 'img/apartment-01.jpg'],
    bedrooms: 1,
    maxAdults: 2,
    description: 'A small cosy studio close to the canals and public transport.',
    goods: ['Wi-Fi', 'Kitchen', 'Washing machine'],
    host: {
      id: 'host-1',
      name: 'Anna',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    location: { latitude: 52.38333, longitude: 4.9, zoom: 12 },
  },
  {
    id: 'offer-2',
    title: 'Large apartment near Rembrandtplein',
    type: 'Apartment',
    price: 180,
    rating: 4.9,
    isPremium: true,
    isBookmarked: true,
    city: 'Amsterdam',
    previewImage: 'img/apartment-03.jpg',
    images: ['img/apartment-03.jpg', 'img/apartment-02.jpg'],
    bedrooms: 3,
    maxAdults: 6,
    description: 'Spacious apartment with great views and modern amenities.',
    goods: ['Wi-Fi', 'Dishwasher', 'Coffee machine', 'Heating'],
    host: {
      id: 'host-2',
      name: 'Mark',
      isPro: false,
      avatarUrl: 'img/avatar-max.jpg',
    },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 12 },
  },
  {
    id: 'offer-3',
    title: 'Quiet room in residential area',
    type: 'Room',
    price: 75,
    rating: 4.1,
    isPremium: false,
    isBookmarked: false,
    city: 'Cologne',
    previewImage: 'img/room.jpg',
    images: ['img/room.jpg'],
    bedrooms: 1,
    maxAdults: 2,
    description: 'Comfortable single room, perfect for business travelers.',
    goods: ['Wi-Fi', 'Fridge'],
    host: {
      id: 'host-3',
      name: 'Julia',
      isPro: false,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    location: { latitude: 50.9375, longitude: 6.9603, zoom: 12 },
  },
  {
    id: 'offer-4',
    title: 'Modern house with garden',
    type: 'House',
    price: 220,
    rating: 5,
    isPremium: true,
    isBookmarked: false,
    city: 'Hamburg',
    previewImage: 'img/apartment-02.jpg',
    images: ['img/apartment-02.jpg', 'img/apartment-01.jpg'],
    bedrooms: 4,
    maxAdults: 8,
    description: 'A modern family house with a large backyard and fast internet.',
    goods: ['Wi-Fi', 'Parking', 'Kitchen', 'Heating'],
    host: {
      id: 'host-4',
      name: 'Oliver',
      isPro: true,
      avatarUrl: 'img/avatar-max.jpg',
    },
    location: { latitude: 53.5511, longitude: 9.9937, zoom: 12 },
  },
];

export default OFFERS;
