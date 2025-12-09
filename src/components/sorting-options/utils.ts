import type { Offer } from '../../types/offer';
import type { SortingOption } from './types';

export const sortOffers = (offers: Offer[], sortingOption: SortingOption): Offer[] => {
  const sortedOffers = [...offers];

  switch (sortingOption) {
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    case 'Popular':
    default:
      return sortedOffers;
  }
};
