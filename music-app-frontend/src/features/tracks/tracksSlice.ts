import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import { fetchTracks } from './tracksThunks';

export interface TracksState {
    tracks: Track[];
    fetchingTracks: boolean;
    errorFetchingTracks: boolean;
}

export const initialState: TracksState = {
    tracks: [],
    fetchingTracks: false,
    errorFetchingTracks: false,
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchTracks.pending, (state) => {
        state.fetchingTracks = true;
        state.errorFetchingTracks = false;
      }).addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
        state.fetchingTracks = false;
        state.tracks = tracks;
      }).addCase(fetchTracks.rejected, (state) => {
        state.fetchingTracks = true;
        state.errorFetchingTracks = false;
      })
    },
    selectors: {
        selectTracks: (state) => state.tracks,
        selectFetchingTracks: (state) => state.fetchingTracks,
        selectErrorFetchingTracks: (state) => state.errorFetchingTracks,
    },
});

export const tracksReducer = tracksSlice.reducer;

export const {
    selectTracks,
    selectFetchingTracks,
    selectErrorFetchingTracks,
} = tracksSlice.selectors;