export type CitiesListProps = {
  cities: string[];
  currentCity: string;
  onCityChange: (city: string) => void;
};
