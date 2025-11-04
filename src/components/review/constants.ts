import type { ReviewType } from './types';

export const REVIEWS: ReviewType[] = [
  {
    id: 'review-1',
    date: '2019-04-24',
    user: {
      name: 'Max',
      avatarUrl: 'markup/img/avatar-max.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
  },
];

export default REVIEWS;
