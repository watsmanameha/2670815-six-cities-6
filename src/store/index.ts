import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offersReducer from './slices/offers-slice';
import userReducer from './slices/user-slice';
import commentsReducer from './slices/comments-slice';
import favoritesReducer from './slices/favorites-slice';

const api = createAPI();

const rootReducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
  comments: commentsReducer,
  favorites: favoritesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
