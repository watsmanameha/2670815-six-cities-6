import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sortOffers } from '../components/sorting-options/utils';
import type { SortingOption } from '../components/sorting-options/types';

// Базовые селекторы
export const selectCurrentCity = (state: RootState) => state.offers.currentCity;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectIsOffersLoading = (state: RootState) => state.offers.isOffersLoading;
export const selectHasError = (state: RootState) => state.offers.hasError;

export const selectCurrentOffer = (state: RootState) => state.offers.currentOffer;
export const selectIsOfferLoading = (state: RootState) => state.offers.isOfferLoading;
export const selectHasOfferError = (state: RootState) => state.offers.hasOfferError;

export const selectNearbyOffers = (state: RootState) => state.offers.nearbyOffers;
export const selectIsNearbyOffersLoading = (state: RootState) => state.offers.isNearbyOffersLoading;
export const selectHasNearbyOffersError = (state: RootState) => state.offers.hasNearbyOffersError;

export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectUser = (state: RootState) => state.user.user;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectIsCommentsLoading = (state: RootState) => state.comments.isCommentsLoading;
export const selectHasCommentsError = (state: RootState) => state.comments.hasCommentsError;
export const selectIsCommentPosting = (state: RootState) => state.comments.isCommentPosting;

// Мемоизированные селекторы
export const selectFilteredOffers = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity)
);

export const selectCities = createSelector(
  [selectOffers],
  (offers) => {
    const citiesSet = new Set(offers.map((offer) => offer.city.name));
    return Array.from(citiesSet);
  }
);

export const selectSortedOffers = createSelector(
  [selectFilteredOffers, (_state: RootState, sortingOption: SortingOption) => sortingOption],
  (filteredOffers, sortingOption) => sortOffers(filteredOffers, sortingOption)
);

export const selectCurrentCityLocation = createSelector(
  [selectFilteredOffers],
  (filteredOffers) => {
    if (filteredOffers.length === 0) {
      return null;
    }
    return filteredOffers[0].city;
  }
);

export const selectOffersCount = createSelector(
  [selectFilteredOffers],
  (filteredOffers) => filteredOffers.length
);
