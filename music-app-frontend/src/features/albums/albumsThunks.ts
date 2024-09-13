import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album} from "../../types";
import axiosApi from "../../axiosApi";


export const fetchAlbums = createAsyncThunk<Album[], string>(
  'artists/fetchAlbums',
  async (artistId) => {
    const {data: albums} = await axiosApi.get<Album[]>(`/albums/${artistId}`);
    return albums;
  },
);

export const fetchOneAlbum = createAsyncThunk<Album, string>(
  'artists/fetchOneAlbum',
  async (artistId) => {
    const {data: artist} = await axiosApi.get<Album>(`/albums/${artistId}`);
    return artist;
  },
);