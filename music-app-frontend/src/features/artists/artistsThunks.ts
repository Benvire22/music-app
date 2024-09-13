import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk<Artist[]>('artists/fetchArtists', async () => {
  const { data: artists } = await axiosApi.get<Artist[]>('/artists');

  if (!artists) {
    return [];
  }

  return artists;
});

export const fetchOneArtist = createAsyncThunk<Artist | null, string>('artists/fetchOneArtist', async (artistId) => {
  const { data: artist } = await axiosApi.get<Artist>(`/artists/${artistId}`);

  if (!artist) {
    return null;
  }

  return artist;
});
