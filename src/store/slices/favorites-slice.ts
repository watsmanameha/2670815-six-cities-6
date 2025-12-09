import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchFavorites, toggleFavorite } from '../action';

type FavoritesSliceState = {
  favorites: Offer[];
  isFavoritesLoading: boolean;
  hasFavoritesError: boolean;
};

const initialState: FavoritesSliceState = {
  favorites: [],
  isFavoritesLoading: false,
  hasFavoritesError: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isFavoritesLoading = true;
        state.hasFavoritesError = false;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isFavoritesLoading = false;
        state.hasFavoritesError = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (updatedOffer.isFavorite) {
          // Добавляем в избранное, если его там еще нет
          const existingIndex = state.favorites.findIndex((offer) => offer.id === updatedOffer.id);
          if (existingIndex === -1) {
            state.favorites.push(updatedOffer);
          } else {
            state.favorites[existingIndex] = updatedOffer;
          }
        } else {
          // Убираем из избранного
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }
      });
  },
});

export default favoritesSlice.reducer;
