import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus, UserData } from '../types/auth';
import { Comment } from '../types/comment';
import { setCity, setOffers, setAuthorizationStatus, fetchOffers, fetchOffer, fetchNearbyOffers, checkAuth, login, logout, fetchComments, postComment } from './action';

export type OffersState = {
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
  comments: Comment[];
  isCommentsLoading: boolean;
  hasCommentsError: boolean;
  isCommentPosting: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: OffersState = {
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
  comments: [],
  isCommentsLoading: false,
  hasCommentsError: false,
  isCommentPosting: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
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
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(fetchComments.pending, (state) => {
      state.isCommentsLoading = true;
      state.hasCommentsError = false;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoading = false;
    })
    .addCase(fetchComments.rejected, (state) => {
      state.isCommentsLoading = false;
      state.hasCommentsError = true;
    })
    .addCase(postComment.pending, (state) => {
      state.isCommentPosting = true;
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.isCommentPosting = false;
    })
    .addCase(postComment.rejected, (state) => {
      state.isCommentPosting = false;
    });
});

export default reducer;
