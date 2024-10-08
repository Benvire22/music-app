import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, Track, TrackHistory, TrackMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

export const fetchTracks = createAsyncThunk<Track[], string>('tracks/fetchTracks', async (albumId) => {
  const { data: tracks } = await axiosApi.get<Track[]>(`/tracks?album=${albumId}`);
  return tracks;
});

export const fetchHistoryTracks = createAsyncThunk<
  TrackHistory[],
  void,
  { rejectValue: GlobalError; state: RootState }
>('tracks/fetchHistoryTracks', async (_, { rejectWithValue, getState }) => {
  try {
    const existingUser = getState().users.user;

    if (!existingUser) {
      return [];
    }

    const { data: historyTracks } = await axiosApi.get<TrackHistory[]>('/track_history', {
      headers: { Authorization: `Bearer ${existingUser.token}` },
    });

    if (!historyTracks) {
      return [];
    }

    return historyTracks;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const addTrackToHistory = createAsyncThunk<void, string, { rejectValue: GlobalError; state: RootState }>(
  'tracks/fetchHistoryTracks',
  async (trackId, { rejectWithValue, getState }) => {
    try {
      const existingUser = getState().users.user;

      const track = {
        track: trackId,
      };

      if (existingUser) {
        await axiosApi.post('/track_history', track, {
          headers: { Authorization: `Bearer ${existingUser.token}` },
        });
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);


export const createTrack = createAsyncThunk<void, TrackMutation, {
  rejectValue: GlobalError
}>('tracks/create', async (trackMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post(`/tracks/`, trackMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const togglePublishedTrack = createAsyncThunk<void, string>('tracks/togglePublished', async (trackId) => {
  try {
    await axiosApi.patch(`/tracks/${trackId}/togglePublished`);
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export const deleteTrack = createAsyncThunk<void, string>('tracks/delete', async (trackId) => {
  try {
    await axiosApi.delete(`/tracks/${trackId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
});
