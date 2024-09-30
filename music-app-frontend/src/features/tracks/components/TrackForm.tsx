import React, { useEffect, useState } from 'react';
import { Alert, MenuItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { TrackMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists } from '../../artists/artistsSlice';
import { fetchArtists } from '../../artists/artistsThunks';
import { selectErrorCreatingTrack } from '../tracksSlice';
import { fetchAlbums } from '../../albums/albumsThunks';
import { selectAlbums } from '../../albums/albumsSlice';

interface Props {
  onSubmit: (track: TrackMutation) => void;
  isLoading: boolean;
}

const TrackForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const error = useAppSelector(selectErrorCreatingTrack);
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const dispatch = useAppDispatch();

  const [state, setState] = useState<TrackMutation>({
    name: '',
    album: '',
    artist: '',
    length: '',
    number: '',
  });

  useEffect(() => {
    try {
      void dispatch(fetchArtists()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      if (state.artist) {
        void dispatch(fetchAlbums(state.artist)).unwrap();
      }
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, state.artist]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error.error}
        </Alert>
      )}
      <Grid>
        <TextField
          required
          label="Track title"
          id="name"
          name="name"
          value={state.name}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          select
          label="Artist"
          id="artist"
          name="artist"
          value={state.artist}
          onChange={inputChangeHandler}
        >
          <MenuItem value="" disabled>
            Select artist
          </MenuItem>
          {artists.map((artist) => (
            <MenuItem
              key={artist._id}
              value={artist._id}
            >
              {artist.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid>
        <TextField
          required
          select
          label="Album"
          id="album"
          name="album"
          value={state.album}
          onChange={inputChangeHandler}
        >
          <MenuItem value="" disabled>
            Select artist
          </MenuItem>
          {albums.map((album) => (
            <MenuItem key={album._id} value={album._id}>
              {album.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid>
        <TextField
          required
          type="text"
          label="length"
          id="length"
          name="length"
          value={state.length}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          type="number"
          label="Number in album"
          id="number"
          name="number"
          value={state.number}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default TrackForm;
