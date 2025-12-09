import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffers, fetchOffer, fetchNearbyOffers, toggleFavorite } from '../action';

type OffersSliceState = {
  currentCity: string;
  offers: Offer[];
  isOffersLoading: boolean;
  hasError: boolean;
  currentOffer: Offer | null;
  isOfferLoading: boolean;
  hasOfferError: boolean;
  nearbyOffers: Offer[];
  isNearbyOffersLoading: boolean;
  hasNearbyOffersError: boolean;
};

const initialState: OffersSliceState = {
  currentCity: 'Paris',
  offers: [],
  isOffersLoading: false,
  hasError: false,
  currentOffer: null,
  isOfferLoading: false,
  hasOfferError: false,
  nearbyOffers: [],
  isNearbyOffersLoading: false,
  hasNearbyOffersError: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: { payload: string }) => {
      state.currentCity = action.payload;
    },
    setOffers: (state, action: { payload: Offer[] }) => {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearbyOffersLoading = true;
        state.hasNearbyOffersError = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isNearbyOffersLoading = false;
        state.hasNearbyOffersError = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        // Обновляем в основном списке предложений
        const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex] = updatedOffer;
        }

        // Обновляем текущее предложение, если оно совпадает
        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer = updatedOffer;
        }

        // Обновляем в списке ближайших предложений, если оно там есть
        const nearbyIndex = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex] = updatedOffer;
        }
      });
  },
});

export const { setCity, setOffers } = offersSlice.actions;
export default offersSlice.reducer;
