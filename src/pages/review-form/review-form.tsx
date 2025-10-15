import type { FC, FormEvent, ChangeEvent } from 'react';
import { useState, useCallback, useMemo } from 'react';

export type ReviewFormData = {
  rating: number;
  comment: string;
};

type ReviewFormProps = {
  onSubmit?: (data: ReviewFormData) => void;
};

/**
 * ReviewForm — форма отправки комментария на странице предложения.
 * Реализована как контролируемая форма: рейтинг и текст комментария хранятся в state.
 */
const ReviewForm: FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

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

    if (!isValid || rating === null) {
      return;
    }

    const data: ReviewFormData = { rating, comment: comment.trim() };

    if (onSubmit) {
      onSubmit(data);
    } else {
      // Временное поведение: просто логируем и сбрасываем форму
      // eslint-disable-next-line no-console
      console.log('Review submitted:', data);
    }

    // Сброс формы
    setRating(null);
    setComment('');
  }, [isValid, rating, comment, onSubmit]);

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
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
