import { type FC } from 'react';
import type { CitiesListProps } from './types';

const CitiesList: FC<CitiesListProps> = ({ cities, currentCity, onCityChange }) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <button
            type="button"
            className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
            onClick={() => onCityChange(city)}
          >
            <span>{city}</span>
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export default CitiesList;
