import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbums, fetchOneAlbum } from './albumsThunks';

export interface ArtistsSlice {
  albums: Album[];
  fetchingAlbums: boolean;
  errorFetchingAlbums: boolean;
  oneAlbum: Album | null;
  fetchOneAlbum: boolean;
}

export const initialState: ArtistsSlice = {
  albums: [],
  fetchingAlbums: false,
  errorFetchingAlbums: false,
  oneAlbum: null,
  fetchOneAlbum: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchingAlbums = true;
        state.errorFetchingAlbums = false;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.albums = albums;
        state.fetchingAlbums = false;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.fetchingAlbums = false;
        state.errorFetchingAlbums = true;
      });

    builder
      .addCase(fetchOneAlbum.pending, (state) => {
        state.oneAlbum = null;
        state.fetchOneAlbum = true;
        state.errorFetchingAlbums = false;
      })
      .addCase(fetchOneAlbum.fulfilled, (state, { payload: album }) => {
        state.oneAlbum = album;
        state.fetchOneAlbum = false;
      })
      .addCase(fetchOneAlbum.rejected, (state) => {
        state.fetchOneAlbum = false;
        state.errorFetchingAlbums = true;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectFetchingAlbums: (state) => state.fetchingAlbums,
    selectErrorFetchingAlbums: (state) => state.errorFetchingAlbums,
    selectOneAlbum: (state) => state.oneAlbum,
    selectFetchingOneAlbum: (state) => state.fetchOneAlbum,
  },
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectFetchingAlbums,
  selectErrorFetchingAlbums,
  selectOneAlbum,
  selectFetchingOneAlbum
} = albumsSlice.selectors;
