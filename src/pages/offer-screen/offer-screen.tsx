import type { FC } from 'react';
import { useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getRatingWidth } from '../place-card/utils';
import ReviewsList from '../../components/review/reviews-list';
import ReviewForm from '../review-form/review-form';
import Map from '../../components/map/map';
import NearbyOffers from '../../components/nearby-offers/nearby-offers';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import { fetchOffer, fetchNearbyOffers, fetchComments, toggleFavorite } from '../../store/action';
import { AuthorizationStatus } from '../../types/auth';
import type { AppDispatch } from '../../store';
import {
  selectCurrentOffer,
  selectIsOfferLoading,
  selectHasOfferError,
  selectNearbyOffers,
  selectComments,
  selectAuthorizationStatus,
} from '../../store/selectors';

const OfferScreen: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const offer = useSelector(selectCurrentOffer);
  const isOfferLoading = useSelector(selectIsOfferLoading);
  const hasOfferError = useSelector(selectHasOfferError);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const comments = useSelector(selectComments);
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const images = useMemo(() => {
    if (!offer) {
      return [];
    }
    return offer.images && offer.images.length > 0 ? offer.images : [offer.previewImage];
  }, [offer]);

  const ratingWidth = useMemo(() => (offer ? getRatingWidth(offer.rating) : '0%'), [offer]);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const handleBookmarkClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    if (offer?.id) {
      const status = offer.isFavorite ? 0 : 1;
      dispatch(toggleFavorite({ offerId: offer.id, status }));
    }
  }, [authorizationStatus, navigate, offer?.id, offer?.isFavorite, dispatch]);

  const points = useMemo(() => {
    if (!offer) {
      return [];
    }
    return [
      {
        id: offer.id,
        title: offer.title,
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      },
      ...nearbyOffers.map((p) => ({
        id: p.id,
        title: p.title,
        lat: p.location.latitude,
        lng: p.location.longitude,
      })),
    ];
  }, [offer, nearbyOffers]);

  if (isOfferLoading) {
    return (
      <div className="page">
        <main className="page__main">
          <div className="container">
            <Spinner />
          </div>
        </main>
      </div>
    );
  }

  if (hasOfferError || !offer) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((src) => (
                <div className="offer__image-wrapper" key={src}>
                  <img className="offer__image" src={src} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                {offer.bedrooms !== undefined && (
                  <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                )}
                {offer.maxAdults !== undefined && (
                  <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
                )}
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              {offer.goods && offer.goods.length > 0 && (
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">{good}</li>
                    ))}
                  </ul>
                </div>
              )}
              {offer.host && (
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  {offer.description && (
                    <div className="offer__description">
                      <p className="offer__text">{offer.description}</p>
                    </div>
                  )}
                </div>
              )}
              <ReviewsList reviews={comments}>
                {isAuthorized && id && <ReviewForm offerId={id} />}
              </ReviewsList>
            </div>
            <section className="offer__map map">
              <Map
                city={offer.city}
                points={points}
                selectedPoint={undefined}
              />
            </section>
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyOffers offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferScreen;
