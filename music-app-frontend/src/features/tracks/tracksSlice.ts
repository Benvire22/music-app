import { Track, TrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchHistoryTracks, fetchTracks } from './tracksThunks';

export interface TracksState {
  tracks: Track[];
  fetchingTracks: boolean;
  errorFetchingTracks: boolean;
  trackHistory: TrackHistory[];
  fetchLoadingHistoryTracks: boolean;
  errorFetchingHistoryTracks: boolean;
}

export const initialState: TracksState = {
  tracks: [],
  fetchingTracks: false,
  errorFetchingTracks: false,
  trackHistory: [],
  fetchLoadingHistoryTracks: false,
  errorFetchingHistoryTracks: false,
};

export const tracksSlice = createSlice<TracksState>({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchingTracks = true;
        state.errorFetchingTracks = false;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetchingTracks = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchingTracks = false;
        state.errorFetchingTracks = true;
      });

    builder
      .addCase(fetchHistoryTracks.pending, (state) => {
        state.fetchLoadingHistoryTracks = true;
        state.errorFetchingTracks = false;
      })
      .addCase(fetchHistoryTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetchLoadingHistoryTracks = false;
        state.trackHistory = tracks;
      })
      .addCase(fetchHistoryTracks.rejected, (state) => {
        state.fetchingTracks = false;
        state.errorFetchingTracks = true;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectFetchingTracks: (state) => state.fetchingTracks,
    selectErrorFetchingTracks: (state) => state.errorFetchingTracks,
    selectHistoryTracks: (state) => state.trackHistory,
    selectFetchingHistoryTracks: (state) => state.fetchLoadingHistoryTracks,
    selectFetchingErrorHistoryTrack: (state) => state.errorFetchingHistoryTracks,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectFetchingTracks,
  selectHistoryTracks,
  selectFetchingHistoryTracks
} = tracksSlice.selectors;
