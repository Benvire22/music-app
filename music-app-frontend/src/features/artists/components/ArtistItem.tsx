import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, IconButton, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { API_URL } from '../../../constants';
import imageNotFound from '../../../assets/images/image-not-found.png';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { User } from '../../../types';
import { deleteArtist, fetchArtists, togglePublished } from '../artistsThunks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { selectDeletingArtist, selectPublishingArtist } from '../artistsSlice';

const ImageCardMedia = styled(CardMedia)({
  height: '100px',
  width: '100px',
  borderRadius: '50%',
});

interface Props {
  id: string;
  name: string;
  description: string | null;
  photo: string | null;
  isPublished: boolean;
  user?: User;
}

const ArtistItem: React.FC<Props> = ({ id, name, photo, isPublished, user }) => {
  let cardImage = imageNotFound;
  const dispatch = useAppDispatch();
  const isPublishing = useAppSelector(selectPublishingArtist);
  const isDeleting = useAppSelector(selectDeletingArtist);

  if (photo) {
    cardImage = `${API_URL}/${photo}`;
  }

  const handleToggle = async () => {
    try {
      await dispatch(togglePublished(id)).unwrap();
      await dispatch(fetchArtists()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteArtist(id)).unwrap();
      await dispatch(fetchArtists()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid sx={{ width: '100%', margin: '20px 0 0 150px' }}>
      {!isPublished && (
        <Typography variant='h5' color="#ccc" >Not published</Typography>
      )}
      <Card sx={{ display: 'flex', p: 2 }}>
        <ImageCardMedia image={cardImage} title={name} />
        <CardHeader title={name} />
        <CardActions sx={{ marginLeft: 'auto' }}>
          {user?.role === 'admin' && !isPublished && (
            <LoadingButton
              type='button'
              onClick={handleToggle}
              fullWidth
              color='primary'
              loading={isPublishing}
              loadingPosition='end'
              endIcon={<ArrowForwardIcon />}
              variant='contained'
            >
              <span>Publish</span>
            </LoadingButton>
          )}
          {user?.role === 'admin' && (
            <LoadingButton
              type='button'
              onClick={handleDelete}
              fullWidth
              color='error'
              loading={isDeleting}
              loadingPosition='end'
              endIcon={<DeleteForeverIcon />}
              variant='contained'
            >
              <span>delete</span>
            </LoadingButton>
          )}
          <IconButton component={Link} to={`/artists/${id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;
