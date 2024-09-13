import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';

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
