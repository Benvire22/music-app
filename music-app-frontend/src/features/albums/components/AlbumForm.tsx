import React, { useEffect, useState } from 'react';
import { Alert, MenuItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { AlbumMutation } from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists } from '../../artists/artistsSlice';
import { fetchArtists } from '../../artists/artistsThunks';
import { selectErrorCreatingAlbum } from '../albumsSlice';

interface Props {
  onSubmit: (album: AlbumMutation) => void;
  isLoading: boolean;
}

const AlbumForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const error = useAppSelector(selectErrorCreatingAlbum);
  const artists = useAppSelector(selectArtists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchArtists()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  const [state, setState] = useState<AlbumMutation>({
    name: '',
    image: null,
    artist: '',
    releaseDate: '',
  });

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

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction='column' spacing={2} component='form' onSubmit={submitFormHandler}>
      {error && (
        <Alert severity='error' sx={{ mt: 3 }}>
          {error.error}
        </Alert>
      )}
      <Grid>
        <TextField
          required
          label='Album title'
          id='name'
          name='name'
          value={state.name}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          select
          label='Artist'
          id='artist'
          name='artist'
          value={state.artist}
          onChange={inputChangeHandler}
        >
          <MenuItem value='' disabled>
            Select artist
          </MenuItem>
          {artists.map((artist) => (
            <MenuItem key={artist._id} value={artist._id}>
              {artist.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid>
        <TextField
          required
          type='number'
          min='0'
          label='Release date'
          id='releaseDate'
          name='releaseDate'
          value={state.releaseDate}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput
          label='Image'
          name='image'
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type='submit'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<SaveIcon />}
          variant='contained'
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default AlbumForm;
