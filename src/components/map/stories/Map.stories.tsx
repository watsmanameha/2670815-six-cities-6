import type { Meta, StoryObj } from '@storybook/react-vite';
import Map from '../map';
import type { Points } from '../types';
import type { Offer } from '../../../types/offer';

const meta = {
  title: 'Components/Map',
  component: Map,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '500px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

const amsterdamCity: Offer['city'] = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13,
  },
};

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful apartment in Amsterdam',
    type: 'apartment',
    price: 120,
    city: amsterdamCity,
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 13 },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
  },
  {
    id: '2',
    title: 'Cozy studio in the city center',
    type: 'room',
    price: 80,
    city: amsterdamCity,
    location: { latitude: 52.369553943508, longitude: 4.85309666406198, zoom: 13 },
    isFavorite: true,
    isPremium: false,
    rating: 4.2,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
  },
  {
    id: '3',
    title: 'Spacious house near the canal',
    type: 'house',
    price: 200,
    city: amsterdamCity,
    location: { latitude: 52.3909553943508, longitude: 4.929309666406198, zoom: 13 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
  },
];

const points: Points = mockOffers.map((offer) => ({
  id: offer.id,
  title: offer.title,
  lat: offer.location.latitude,
  lng: offer.location.longitude,
}));

export const Default: Story = {
  args: {
    city: amsterdamCity,
    points: points,
    selectedPoint: undefined,
  },
};

export const WithSelectedPoint: Story = {
  args: {
    city: amsterdamCity,
    points: points,
    selectedPoint: points[0],
  },
};

export const SinglePoint: Story = {
  args: {
    city: amsterdamCity,
    points: [points[0]],
    selectedPoint: points[0],
  },
};
