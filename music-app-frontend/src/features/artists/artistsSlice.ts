import { Artist, GlobalError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createArtist, deleteArtist, fetchArtists, fetchOneArtist, togglePublished } from './artistsThunks';

export interface ArtistsState {
  artists: Artist[];
  fetchingArtists: boolean;
  errorFetchingArtists: boolean;
  oneArtist: Artist | null;
  fetchOneArtist: boolean;
  isCreating: boolean;
  errorCreating: null | GlobalError;
  isPublishing: boolean;
  isDeleting: boolean;
}

export const initialState: ArtistsState = {
  artists: [],
  fetchingArtists: false,
  errorFetchingArtists: false,
  oneArtist: null,
  fetchOneArtist: false,
  isCreating: false,
  errorCreating: null,
  isPublishing: false,
  isDeleting: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchingArtists = true;
        state.errorFetchingArtists = false;
      })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
        state.artists = artists;
        state.fetchingArtists = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchingArtists = false;
        state.errorFetchingArtists = true;
      });

    builder
      .addCase(fetchOneArtist.pending, (state) => {
        state.oneArtist = null;
        state.fetchOneArtist = true;
        state.errorFetchingArtists = false;
      })
      .addCase(fetchOneArtist.fulfilled, (state, {payload: artist}) => {
        state.oneArtist = artist;
        state.fetchOneArtist = false;
      })
      .addCase(fetchOneArtist.rejected, (state) => {
        state.fetchOneArtist = false;
        state.errorFetchingArtists = true;
      });

    builder
      .addCase(createArtist.pending, (state) => {
        state.isCreating = true;
        state.errorCreating = null;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createArtist.rejected, (state, {payload: error}) => {
        state.isCreating = false;
        state.errorCreating = error || null;
      });

    builder
      .addCase(togglePublished.pending, (state) => {
        state.isPublishing = true;
      })
      .addCase(togglePublished.fulfilled, (state) => {
        state.isPublishing = false;
      })
      .addCase(togglePublished.rejected, (state) => {
        state.isPublishing = false;
      });

    builder
      .addCase(deleteArtist.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectFetchingArtists: (state) => state.fetchingArtists,
    selectErrorFetchingArtists: (state) => state.errorFetchingArtists,
    selectOneArtist: (state) => state.oneArtist,
    selectFetchingOneArtist: (state) => state.fetchOneArtist,
    selectCreatingArtist: (state) => state.isCreating,
    selectErrorCreatingArtist: (state) => state.errorCreating,
    selectPublishingArtist: (state) => state.isPublishing,
    selectDeletingArtist: (state) => state.isDeleting,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectFetchingArtists,
  selectOneArtist,
  selectFetchingOneArtist,
  selectCreatingArtist,
  selectErrorCreatingArtist,
  selectPublishingArtist,
  selectDeletingArtist,
} = artistsSlice.selectors;
