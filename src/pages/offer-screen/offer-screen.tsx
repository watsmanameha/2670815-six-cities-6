import type { FC } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getRatingWidth } from '../place-card/utils';
import ReviewsList from '../../components/review/reviews-list';
import { REVIEWS } from '../../components/review/constants';
import ReviewForm from '../review-form/review-form';
import Map from '../../components/map/map';
import NearbyOffers from '../../components/nearby-offers/nearby-offers';
import Spinner from '../../components/spinner/spinner';
import { fetchOffer } from '../../store/action';
import type { AppDispatch, RootState } from '../../store';

const OfferScreen: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const offer = useSelector((state: RootState) => state.currentOffer);
  const isOfferLoading = useSelector((state: RootState) => state.isOfferLoading);
  const hasOfferError = useSelector((state: RootState) => state.hasOfferError);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
    }
  }, [dispatch, id]);

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

  const images = [offer.previewImage];
  const ratingWidth = getRatingWidth(offer.rating);
  const reviews = REVIEWS;
  const nearby: any[] = [];
  const points = nearby.map((p: any) => ({ id: p.id, title: p.title, lat: p.location.latitude, lng: p.location.longitude }));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="markup/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                {3 !== undefined && (
                  <li className="offer__feature offer__feature--bedrooms">3 Bedrooms</li>
                )}
                {4 !== undefined && (
                  <li className="offer__feature offer__feature--adults">Max 4 adults</li>
                )}
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="markup/img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name"> Angelina </span>
                  <span className="offer__user-status"> Pro </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.</p>
                  <p className="offer__text">An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.</p>
                </div>
              </div>
              <ReviewsList reviews={reviews}>
                <ReviewForm />
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
            <NearbyOffers offers={nearby} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferScreen;
