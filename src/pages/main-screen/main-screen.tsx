/**
 * MainScreen – компонент главной страницы приложения «6 cities».
 * Временная крупная монолитная версия, созданная на основе разметки из markup/main.html.
 * В дальнейшем будет декомпозирован на подкомпоненты.
 */
import { type FC, useMemo, useState } from 'react';
import OffersList from '../offers-list/offers-list';
import { Link } from 'react-router-dom';
import type { Point } from '../../components/map/types';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import Spinner from '../../components/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../../store/action';
import type { RootState } from '../../store';
import type { SortingOption } from '../../components/sorting-options/types';
import { DEFAULT_SORTING } from '../../components/sorting-options/constants';
import { sortOffers } from '../../components/sorting-options/utils';
import SortingOptions from '../../components/sorting-options/sorting-options';

const MainScreen: FC = () => {
  const currentCity = useSelector((state: RootState) => state.currentCity);
  const offers = useSelector((state: RootState) => state.offers);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const hasError = useSelector((state: RootState) => state.hasError);
  const dispatch = useDispatch();
  const [currentSorting, setCurrentSorting] = useState<SortingOption>(DEFAULT_SORTING);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const filteredOffers = useMemo(() => (
    offers.filter((offer) => offer.city.name === currentCity)
  ), [offers, currentCity]);

  const sortedOffers = useMemo(() => (
    sortOffers(filteredOffers, currentSorting)
  ), [filteredOffers, currentSorting]);

  const points = useMemo<Point[]>(() => (
    sortedOffers.map((offer) => ({
      id: offer.id,
      title: offer.title,
      lat: offer.location.latitude,
      lng: offer.location.longitude,
    }))
  ), [sortedOffers]);

  const selectedPoint = useMemo(() => (
    selectedOfferId ? points.find((p) => p.id === selectedOfferId) : undefined
  ), [selectedOfferId, points]);

  const city = sortedOffers[0]?.city || offers[0]?.city;

  if (hasError) {
    return (
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2>Ошибка загрузки данных</h2>
                <p>Не удалось загрузить список предложений. Проверьте подключение к интернету и попробуйте обновить страницу.</p>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isOffersLoading) {
    return (
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <div className="cities">
            <div className="cities__places-container container">
              <Spinner />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            cities={['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']}
            currentCity={currentCity}
            onCityChange={(c) => dispatch(setCity(c))}
          />
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
              <SortingOptions
                currentSorting={currentSorting}
                onSortingChange={setCurrentSorting}
              />
              <OffersList
                offers={sortedOffers}
                onActiveOfferChange={setSelectedOfferId}
              />
            </section>
            <div className="cities__right-section">
              {city ? (
                <Map city={city} points={points} selectedPoint={selectedPoint}/>
              ) : (
                <section className="cities__map map"></section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MainScreen;
