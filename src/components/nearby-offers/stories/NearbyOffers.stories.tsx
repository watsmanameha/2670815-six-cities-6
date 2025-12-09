import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import NearbyOffers from '../nearby-offers';
import type { Offer } from '../../../types/offer';

const meta = {
  title: 'Components/NearbyOffers',
  component: NearbyOffers,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof NearbyOffers>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment',
    type: 'Apartment',
    price: 120,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'House',
    price: 80,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
  },
  {
    id: '3',
    title: 'Canal view prinsengracht',
    type: 'Apartment',
    price: 132,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.8,
  },
];

export const Default: Story = {
  args: {
    offers: mockOffers.slice(0, 3),
  },
};

export const SingleOffer: Story = {
  args: {
    offers: [mockOffers[0]],
  },
};

export const AllOffers: Story = {
  args: {
    offers: mockOffers,
  },
};

export const Empty: Story = {
  args: {
    offers: [],
  },
};
