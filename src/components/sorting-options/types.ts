export type SortingOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type SortingOptionsProps = {
  currentSorting: SortingOption;
  onSortingChange: (option: SortingOption) => void;
};
