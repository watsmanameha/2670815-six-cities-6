import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { setCity, setOffers, fetchOffers, fetchOffer } from './action';

type OffersState = {
  currentCity: string;
  offers: Offer[];
  isOffersLoading: boolean;
  hasError: boolean;
  currentOffer: Offer | null;
  isOfferLoading: boolean;
  hasOfferError: boolean;
};

const initialState: OffersState = {
  currentCity: 'Paris',
  offers: [],
  isOffersLoading: false,
  hasError: false,
  currentOffer: null,
  isOfferLoading: false,
  hasOfferError: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
      state.hasError = false;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
      state.hasError = true;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.isOfferLoading = true;
      state.hasOfferError = false;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.isOfferLoading = false;
      state.hasOfferError = true;
    });
});

export default reducer;
