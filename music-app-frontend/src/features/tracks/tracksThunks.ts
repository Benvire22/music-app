import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchTracks',
  async (albumId) => {
    const {data: tracks} = await axiosApi.get<Track[]>(`/tracks?album=${albumId}`);
    return tracks;
  },
);