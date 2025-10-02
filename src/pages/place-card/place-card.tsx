import type { FC } from 'react';
import { getRatingWidth } from './utils';

type PlaceCardProps = {
  title: string;
  type: string;
  price: number; // per night
  rating: number; // 0..5
  isPremium?: boolean;
  isBookmarked?: boolean;
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
};

// ... rating util moved to ./utils

/**
 * PlaceCard – карточка предложения для списка на главной странице.
 * Разметка соответствует блоку <article class="cities__card place-card"> из макета.
 */
const PlaceCard: FC<PlaceCardProps> = ({
  title,
  type,
  price,
  rating,
  isPremium = false,
  isBookmarked = false,
  imageSrc,
  imageWidth = 260,
  imageHeight = 200,
}: PlaceCardProps) => (
  <article className="cities__card place-card">
    {isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}

    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={imageSrc}
          width={imageWidth}
          height={imageHeight}
          alt={title}
        />
      </a>
    </div>

    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button button${isBookmarked ? ' place-card__bookmark-button--active' : ''}`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            {isBookmarked ? 'In bookmarks' : 'To bookmarks'}
          </span>
        </button>
      </div>

      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: getRatingWidth(rating) }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>

      <h2 className="place-card__name">
        <a href="#">{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>
);

export default PlaceCard;
