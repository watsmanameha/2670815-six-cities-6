import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { UserData, AuthData, AuthorizationStatus } from '../types/auth';
import { APIRoute } from '../services/api-routes';
import { saveToken, dropToken } from '../services/api';

export const setCity = createAction<string>('app/setCity');
export const setOffers = createAction<Offer[]>('app/setOffers');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

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
