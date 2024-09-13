import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import axiosApi from "../../axiosApi";


export const fetchArtists = createAsyncThunk<Artist[]>(
    'artists/fetchArtists',
    async () => {
        const {data: artists} = await axiosApi.get('/artists');
        return artists;
    },
);

export const fetchOneArtist = createAsyncThunk<Artist, string>(
    'artists/fetchOneArtist',
    async (artistId) => {
        const {data: artist} = await axiosApi.get(`/artists/${artistId}`);
        return artist;
    },
);