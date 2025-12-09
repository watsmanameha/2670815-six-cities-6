/**
 * MainScreen – компонент главной страницы приложения «6 cities».
 * Временная крупная монолитная версия, созданная на основе разметки из markup/main.html.
 * В дальнейшем будет декомпозирован на подкомпоненты.
 */
import { type FC, useMemo, useState, useCallback } from 'react';
import OffersList from '../offers-list/offers-list';
import type { Point } from '../../components/map/types';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import Spinner from '../../components/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../../store/action';
import type { RootState, AppDispatch } from '../../store';
import type { SortingOption } from '../../components/sorting-options/types';
import { DEFAULT_SORTING } from '../../components/sorting-options/constants';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Header from '../../components/header/header';
import {
  selectCurrentCity,
  selectIsOffersLoading,
  selectHasError,
  selectSortedOffers,
  selectCurrentCityLocation,
} from '../../store/selectors';

const MainScreen: FC = () => {
  const [currentSorting, setCurrentSorting] = useState<SortingOption>(DEFAULT_SORTING);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const currentCity = useSelector(selectCurrentCity);
  const isOffersLoading = useSelector(selectIsOffersLoading);
  const hasError = useSelector(selectHasError);
  const sortedOffers = useSelector((state: RootState) => selectSortedOffers(state, currentSorting));
  const city = useSelector(selectCurrentCityLocation);

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

  const handleCityChange = useCallback((city: string) => {
    dispatch(setCity(city));
  }, [dispatch]);

  const handleSortingChange = useCallback((sorting: SortingOption) => {
    setCurrentSorting(sorting);
  }, []);

  const handleOfferHover = useCallback((offerId: string | null) => {
    setSelectedOfferId(offerId);
  }, []);

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
      <Header isMainPage />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            cities={['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']}
            currentCity={currentCity}
            onCityChange={handleCityChange}
          />
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
              <SortingOptions
                currentSorting={currentSorting}
                onSortingChange={handleSortingChange}
              />
              <OffersList
                offers={sortedOffers}
                onActiveOfferChange={handleOfferHover}
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
