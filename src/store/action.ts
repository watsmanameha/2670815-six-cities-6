import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { UserData, AuthData } from '../types/auth';
import { Comment, CommentFormData } from '../types/comment';
import { APIRoute } from '../services/api-routes';
import { saveToken, dropToken } from '../services/api';

// Реэкспорт actions из слайсов
export { setCity, setOffers } from './slices/offers-slice';
export { setAuthorizationStatus } from './slices/user-slice';

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>('data/fetchOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: AxiosInstance }
>('data/fetchNearbyOffers', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
  return data;
});

export const checkAuth = createAsyncThunk<
  UserData,
  undefined,
  { extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const login = createAsyncThunk<
  UserData,
  AuthData,
  { extra: AxiosInstance }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(data.token);
  return data;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  { extra: AxiosInstance }
>('data/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
  return data;
});

export const postComment = createAsyncThunk<
  Comment,
  { offerId: string; commentData: CommentFormData },
  { extra: AxiosInstance }
>('data/postComment', async ({ offerId, commentData }, { extra: api }) => {
  const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, commentData);
  return data;
});

export const toggleFavorite = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { extra: AxiosInstance }
>('data/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
  return data;
});

export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Favorite);
  return data;
});
