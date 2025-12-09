import type { FC, FormEvent, ChangeEvent } from 'react';
import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { postComment } from '../../store/action';
import { selectIsCommentPosting } from '../../store/selectors';

export type ReviewFormProps = {
  offerId: string;
};

/**
 * ReviewForm — форма отправки комментария на странице предложения.
 * Реализована как контролируемая форма: рейтинг и текст комментария хранятся в state.
 */
const ReviewForm: FC<ReviewFormProps> = ({ offerId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const isCommentPosting = useSelector(selectIsCommentPosting);

  const handleRatingChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    setRating(Number.isNaN(value) ? null : value);
  }, []);

  const handleCommentChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  }, []);

  const isValid = useMemo(() => {
    const length = comment.trim().length;
    return rating !== null && length >= 50;
  }, [rating, comment]);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError(null);

    if (!isValid || rating === null) {
      return;
    }

    const commentData = { rating, comment: comment.trim() };

    dispatch(postComment({ offerId, commentData }))
      .unwrap()
      .then(() => {
        // Сброс формы после успешной отправки
        setRating(null);
        setComment('');
      })
      .catch(() => {
        setError('Failed to post comment. Please try again.');
      });
  }, [isValid, rating, comment, offerId, dispatch]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={5}
          id="5-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 5}
          disabled={isCommentPosting}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33"><use xlinkHref="#icon-star"></use></svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={4}
          id="4-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 4}
          disabled={isCommentPosting}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33"><use xlinkHref="#icon-star"></use></svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={3}
          id="3-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 3}
          disabled={isCommentPosting}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33"><use xlinkHref="#icon-star"></use></svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={2}
          id="2-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 2}
          disabled={isCommentPosting}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33"><use xlinkHref="#icon-star"></use></svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={1}
          id="1-star"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 1}
          disabled={isCommentPosting}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33"><use xlinkHref="#icon-star"></use></svg>
        </label>
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isCommentPosting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isCommentPosting}>
          {isCommentPosting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </form>
  );
};

export default ReviewForm;
