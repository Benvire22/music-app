import { Album, GlobalError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createAlbum, deleteAlbum, fetchAlbums, fetchOneAlbum, togglePublishedAlbum } from './albumsThunks';

export interface AlbumState {
  albums: Album[];
  fetchingAlbums: boolean;
  errorFetchingAlbums: boolean;
  oneAlbum: Album | null;
  fetchOneAlbum: boolean;
  isCreating: boolean;
  errorCreating: null | GlobalError;
  isPublishing: boolean;
  isDeleting: boolean;
}

export const initialState: AlbumState = {
  albums: [],
  fetchingAlbums: false,
  errorFetchingAlbums: false,
  oneAlbum: null,
  fetchOneAlbum: false,
  isCreating: false,
  errorCreating: null,
  isPublishing: false,
  isDeleting: false,
};

export const albumsSlice = createSlice<AlbumState>({
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

    builder
      .addCase(createAlbum.pending, (state) => {
        state.isCreating = true;
        state.errorCreating = null;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createAlbum.rejected, (state, {payload: error}) => {
        state.isCreating = false;
        state.errorCreating = error || null;
      });

    builder
      .addCase(togglePublishedAlbum.pending, (state) => {
        state.isPublishing = true;
      })
      .addCase(togglePublishedAlbum.fulfilled, (state) => {
        state.isPublishing = false;
      })
      .addCase(togglePublishedAlbum.rejected, (state) => {
        state.isPublishing = false;
      });

    builder
      .addCase(deleteAlbum.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectFetchingAlbums: (state) => state.fetchingAlbums,
    selectErrorFetchingAlbums: (state) => state.errorFetchingAlbums,
    selectOneAlbum: (state) => state.oneAlbum,
    selectFetchingOneAlbum: (state) => state.fetchOneAlbum,
    selectCreatingAlbum: (state) => state.isCreating,
    selectErrorCreatingAlbum: (state) => state.errorCreating,
    selectPublishingAlbum: (state) => state.isPublishing,
    selectDeletingAlbum: (state) => state.isDeleting,
  },
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectOneAlbum,
  selectCreatingAlbum,
  selectErrorCreatingAlbum,
  selectPublishingAlbum,
  selectDeletingAlbum,
} = albumsSlice.selectors;
