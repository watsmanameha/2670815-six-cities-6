import type { FC } from 'react';
import { getRatingWidth } from './utils';
import type { Offer } from '../../mocks/offers';
import { Link } from 'react-router-dom';

type PlaceCardProps = {
  offer?: Offer;
  title?: string;
  type?: string;
  price?: number; // per night
  rating?: number; // 0..5
  isPremium?: boolean;
  isBookmarked?: boolean;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const PlaceCard: FC<PlaceCardProps> = ({
  offer,
  title,
  type,
  price,
  rating,
  isPremium = false,
  isBookmarked = false,
  imageSrc,
  imageWidth = 260,
  imageHeight = 200,
}: PlaceCardProps) => {
  const finalTitle = offer?.title ?? title ?? '';
  const finalType = offer?.type ?? type ?? '';
  const finalPrice = offer?.price ?? price ?? 0;
  const finalRating = offer?.rating ?? rating ?? 0;
  const finalIsPremium = offer?.isPremium ?? isPremium;
  const finalIsBookmarked = offer?.isBookmarked ?? isBookmarked;
  const finalImage = offer?.previewImage ?? imageSrc ?? '';
  const offerPath = offer?.id ? `/offer/${offer.id}` : '#';

  return (
    <article className="cities__card place-card">
      {finalIsPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerPath}>
          <img
            className="place-card__image"
            src={finalImage}
            width={imageWidth}
            height={imageHeight}
            alt={finalTitle}
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{finalPrice}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${finalIsBookmarked ? ' place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {finalIsBookmarked ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingWidth(finalRating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={offerPath}>{finalTitle}</Link>
        </h2>
        <p className="place-card__type">{finalType}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
