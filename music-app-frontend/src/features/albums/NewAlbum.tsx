import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AlbumMutation } from '../../types';
import { Typography } from '@mui/material';
import AlbumForm from './components/AlbumForm';
import { createAlbum } from './albumsThunks';
import { selectCreatingAlbum } from './albumsSlice';

const NewAlbum = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreatingAlbum);

  const onFormSubmit = async (albumMutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(albumMutation)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant='h4' sx={{ mb: 2 }}>New Album</Typography>
      <AlbumForm
        onSubmit={onFormSubmit}
        isLoading={isCreating}
      />
    </>
  );
};

export default NewAlbum;