import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumMutation, GlobalError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchAlbums = createAsyncThunk<Album[], string>('artists/fetchAlbums', async (artistId) => {
  const { data: albums } = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);

  if (!albums) {
    return [];
  }

  return albums;
});

export const fetchOneAlbum = createAsyncThunk<Album | null, string>(
  'artists/fetchOneAlbum',
  async (artistId) => {
  const { data: album } = await axiosApi.get<Album>(`/albums/${artistId}`);

  if (!album) {
    return null;
  }

  return album;
});

export const createAlbum = createAsyncThunk<void, AlbumMutation, { rejectValue: GlobalError }>('albums/create', async (albumMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post(`/albums/`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const togglePublishedAlbum = createAsyncThunk<void, string>('album/togglePublished', async (albumId) => {
  try {
    await axiosApi.patch(`/albums/${albumId}/togglePublished`);
  } catch (e) {
    throw e;
  }
});

export const deleteAlbum = createAsyncThunk<void, string>('album/delete', async (albumId) => {
  try {
    await axiosApi.delete(`/albums/${albumId}`);
  } catch (e) {
    throw e;
  }
});