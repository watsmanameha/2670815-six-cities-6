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

const points: Points = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment',
    lat: 52.3909553943508,
    lng: 4.85309666406198,
  },
  {
    id: '2',
    title: 'Wood and stone place',
    lat: 52.3609553943508,
    lng: 4.85309666406198,
  },
  {
    id: '3',
    title: 'Canal view prinsengracht',
    lat: 52.3909553943508,
    lng: 4.929309666406198,
  },
];

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
