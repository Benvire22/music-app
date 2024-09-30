import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistMutation, GlobalError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<Artist[]>('artists/fetchArtists', async () => {
  const {data: artists} = await axiosApi.get<Artist[]>('/artists');

  if (!artists) {
    return [];
  }

  return artists;
});

export const fetchOneArtist = createAsyncThunk<Artist | null, string>('artists/fetchOneArtist', async (artistId) => {
  const {data: artist} = await axiosApi.get<Artist>(`/artists/${artistId}`);

  if (!artist) {
    return null;
  }

  return artist;
});

export const createArtist = createAsyncThunk<void, ArtistMutation, {
  rejectValue: GlobalError
}>('artists/create', async (artistMutation, {rejectWithValue}) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post(`/artists/`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const togglePublished = createAsyncThunk<void, string>('artists/togglePublished', async (artistId) => {
  try {
    await axiosApi.patch(`/artists/${artistId}/togglePublished`);
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export const deleteArtist = createAsyncThunk<void, string>('artists/delete', async (artistId) => {
  try {
    await axiosApi.delete(`/artists/${artistId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
});