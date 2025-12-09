import type { FC, ReactNode } from 'react';
import Review from './review';
import type { Comment } from '../../types/comment';

type ReviewsListProps = {
  reviews: Comment[];
  children?: ReactNode;
};

const ReviewsList: FC<ReviewsListProps> = ({ reviews, children }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((r) => (
        <Review key={r.id} review={r} />
      ))}
    </ul>
    {children}
  </section>
);

export default ReviewsList;
