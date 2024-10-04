import { GlobalError, Track, TrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createTrack, deleteTrack, fetchHistoryTracks, fetchTracks, togglePublishedTrack } from './tracksThunks';

export interface TracksState {
  tracks: Track[];
  fetchingTracks: boolean;
  errorFetchingTracks: boolean;
  trackHistory: TrackHistory[];
  fetchLoadingHistoryTracks: boolean;
  errorFetchingHistoryTracks: boolean;
  isCreating: boolean;
  errorCreating: null | GlobalError;
  isPublishing: boolean;
  isDeleting: boolean;
}

export const initialState: TracksState = {
  tracks: [],
  fetchingTracks: false,
  errorFetchingTracks: false,
  trackHistory: [],
  fetchLoadingHistoryTracks: false,
  errorFetchingHistoryTracks: false,
  isCreating: false,
  errorCreating: null,
  isPublishing: false,
  isDeleting: false,
};

export const tracksSlice = createSlice({
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

    builder
      .addCase(createTrack.pending, (state) => {
        state.isCreating = true;
        state.errorCreating = null;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createTrack.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.errorCreating = error || null;
      });

    builder
      .addCase(togglePublishedTrack.pending, (state) => {
        state.isPublishing = true;
      })
      .addCase(togglePublishedTrack.fulfilled, (state) => {
        state.isPublishing = false;
      })
      .addCase(togglePublishedTrack.rejected, (state) => {
        state.isPublishing = false;
      });

    builder
      .addCase(deleteTrack.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectFetchingTracks: (state) => state.fetchingTracks,
    selectErrorFetchingTracks: (state) => state.errorFetchingTracks,
    selectHistoryTracks: (state) => state.trackHistory,
    selectFetchingHistoryTracks: (state) => state.fetchLoadingHistoryTracks,
    selectFetchingErrorHistoryTrack: (state) => state.errorFetchingHistoryTracks,
    selectCreatingTrack: (state) => state.isCreating,
    selectErrorCreatingTrack: (state) => state.errorCreating,
    selectPublishingTrack: (state) => state.isPublishing,
    selectDeletingTrack: (state) => state.isDeleting,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectFetchingTracks,
  selectHistoryTracks,
  selectFetchingHistoryTracks,
  selectCreatingTrack,
  selectErrorCreatingTrack,
  selectPublishingTrack,
  selectDeletingTrack,
} = tracksSlice.selectors;
