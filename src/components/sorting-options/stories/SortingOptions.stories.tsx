import type { Meta, StoryObj } from '@storybook/react-vite';
import SortingOptions from '../sorting-options';

const meta = {
  title: 'Components/SortingOptions',
  component: SortingOptions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onSortingChange: () => {},
  },
} satisfies Meta<typeof SortingOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Popular: Story = {
  args: {
    currentSorting: 'Popular',
  },
};

export const PriceLowToHigh: Story = {
  args: {
    currentSorting: 'Price: low to high',
  },
};

export const PriceHighToLow: Story = {
  args: {
    currentSorting: 'Price: high to low',
  },
};

export const TopRatedFirst: Story = {
  args: {
    currentSorting: 'Top rated first',
  },
};
