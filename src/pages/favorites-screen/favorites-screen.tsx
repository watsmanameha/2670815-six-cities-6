// src/pages/favorites-screen/favorites-screen.tsx
import type { FC } from 'react';
import type { Offer } from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import { Link } from 'react-router-dom';

type FavoritesScreenProps = {
  offers: Offer[];
};

const FavoritesScreen: FC<FavoritesScreenProps> = ({ offers }) => {
  // берём только избранные
  const favs = offers.filter((o) => o.isFavorite);

  // группируем по названию города (строковый ключ!)
  const groups = favs.reduce<Record<string, Offer[]>>((acc, offer) => {
    const cityName = offer.city?.name ?? 'Unknown';
    (acc[cityName] ??= []).push(offer);
    return acc;
  }, {});

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
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">{favs.length}</span>
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(groups).map(([cityName, cityOffers]) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="/">
                        <span>{cityName}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OffersList
                      offers={cityOffers}
                      className="favorites__places"
                      imageWidth={150}
                      imageHeight={110}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="markup/img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesScreen;
