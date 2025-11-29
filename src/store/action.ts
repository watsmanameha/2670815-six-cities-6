import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { APIRoute } from '../services/api-routes';

export const setCity = createAction<string>('app/setCity');
export const setOffers = createAction<Offer[]>('app/setOffers');

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
