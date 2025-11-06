import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';
import { setCity, setOffers } from './action';

type OffersState = {
  currentCity: string;
  offers: Offer[];
};

const initialState: OffersState = {
  currentCity: 'Paris',
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export default reducer;
