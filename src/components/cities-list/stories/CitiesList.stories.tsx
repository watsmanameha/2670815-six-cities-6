import type { Meta, StoryObj } from '@storybook/react-vite';
import CitiesList from '../cities-list';

const meta = {
  title: 'Components/CitiesList',
  component: CitiesList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    cities: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
    onCityChange: () => {},
  },
} satisfies Meta<typeof CitiesList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParisSelected: Story = {
  args: {
    currentCity: 'Paris',
  },
};

export const AmsterdamSelected: Story = {
  args: {
    currentCity: 'Amsterdam',
  },
};

export const CologneSelected: Story = {
  args: {
    currentCity: 'Cologne',
  },
};

export const BrusselsSelected: Story = {
  args: {
    currentCity: 'Brussels',
  },
};

export const HamburgSelected: Story = {
  args: {
    currentCity: 'Hamburg',
  },
};

export const DusseldorfSelected: Story = {
  args: {
    currentCity: 'Dusseldorf',
  },
};
