export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export const OFFERS: Offer[] = [
  {
    id: 'b091e198-fb6a-4a92-95e0-2e681b8d7123',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'house',
    price: 150,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.36554,
      longitude: 4.911976,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.2,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
  },
  {
    id: '7669d6f9-b4cb-4b35-b9d6-b48bce4732a9',
    title: 'House in countryside',
    type: 'apartment',
    price: 402,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.385540000000006,
      longitude: 4.902976,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.5,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
  },
  {
    id: '8cd54c8a-1977-42e0-a80a-405c6742d4e8',
    title: 'The Joshua Tree House',
    type: 'room',
    price: 140,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.397540000000006,
      longitude: 4.9099759999999995,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
  },
  {
    id: 'c571c0d3-4c0c-45c2-8471-7d378c9640cb',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 170,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.37454,
      longitude: 4.881976,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
  },
];

export default OFFERS;
