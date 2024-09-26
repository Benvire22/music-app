import React from 'react';
import ArtistForm from './components/ArtistForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreatingArtist } from './artistsSlice';
import { ArtistMutation } from '../../types';
import { createArtist } from './artistsThunks';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const NewArtist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreatingArtist);

  const onFormSubmit = async (artistMutation: ArtistMutation) => {
    try {
      await dispatch(createArtist(artistMutation)).unwrap();
      navigate('/');
      // toast.success('Post has been created!');
    } catch (error) {
      console.error(error);
      // toast.error('Error creating post!');
    }
  };

  return (
    <>
      <Typography variant='h4' sx={{ mb: 2 }}>New Artist</Typography>
      <ArtistForm
        onSubmit={onFormSubmit}
        isLoading={isCreating}
      />
    </>
  );
};

export default NewArtist;