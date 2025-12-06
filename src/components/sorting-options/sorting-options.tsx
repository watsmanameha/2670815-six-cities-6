import { type FC, useState } from 'react';
import type { SortingOptionsProps, SortingOption } from './types';
import { SORTING_OPTIONS } from './constants';

const SortingOptions: FC<SortingOptionsProps> = ({ currentSorting, onSortingChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SortingOption) => {
    onSortingChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, option: SortingOption) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionClick(option);
    }
  };

  const handleTypeKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleTypeKeyDown}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORTING_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${option === currentSorting ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
            onKeyDown={(e) => handleKeyDown(e, option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortingOptions;
