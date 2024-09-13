import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists, fetchOneArtist } from './artistsThunks';

export interface ArtistsSlice {
  artists: Artist[];
  fetchingArtists: boolean;
  errorFetchingArtists: boolean;
  oneArtist: Artist | null;
  fetchOneArtist: boolean;
}

export const initialState: ArtistsSlice = {
  artists: [],
  fetchingArtists: false,
  errorFetchingArtists: false,
  oneArtist: null,
  fetchOneArtist: false,
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
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
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
      .addCase(fetchOneArtist.fulfilled, (state, { payload: artist }) => {
        state.oneArtist = artist;
        state.fetchOneArtist = false;
      })
      .addCase(fetchOneArtist.rejected, (state) => {
        state.fetchOneArtist = false;
        state.errorFetchingArtists = true;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectFetchingArtists: (state) => state.fetchingArtists,
    selectErrorFetchingArtists: (state) => state.errorFetchingArtists,
    selectOneArtist: (state) => state.oneArtist,
    selectFetchingOneArtist: (state) => state.fetchOneArtist,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectFetchingArtists,
  selectErrorFetchingArtists,
  selectOneArtist,
  selectFetchingOneArtist,
} = artistsSlice.selectors;
