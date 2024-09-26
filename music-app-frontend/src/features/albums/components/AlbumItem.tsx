import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotFound from '../../../assets/images/image-not-found.png';
import { API_URL } from '../../../constants';
import { User } from '../../../types';
import { LoadingButton } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppSelector } from '../../../app/hooks';
import { selectDeletingAlbum, selectPublishingAlbum } from '../albumsSlice';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  name: string;
  releaseDate: number;
  image: string | null;
  isPublished: boolean;
  user?: User;
  handleToggle?: VoidFunction;
  handleDelete?: VoidFunction;
}

const AlbumItem: React.FC<Props> = ({
  id,
  name,
  image,
  releaseDate,
  isPublished,
  user,
  handleToggle,
  handleDelete,
}) => {
  let cardImage = imageNotFound;
  const isPublishing = useAppSelector(selectPublishingAlbum);
  const isDeleting = useAppSelector(selectDeletingAlbum);

  if (image) {
    cardImage = `${API_URL}/${image}`;
  }

  return (
    <Grid sx={{ width: '45%' }}>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={name} />
        <ImageCardMedia image={cardImage} title={name} />
        <CardContent>
          {!isPublished && (
            <Typography variant='h5' component="span" color='gray'>Not published </Typography>
          )}
          <strong>{releaseDate}</strong>
        </CardContent>
        <CardActions>
          {user?.role === 'admin' && !isPublished && (
            <LoadingButton
              type='button'
              onClick={handleToggle}
              color='primary'
              loading={isPublishing}
              loadingPosition='end'
              endIcon={<ArrowForwardIcon />}
              variant='contained'
            >
              <span>Publish</span>
            </LoadingButton>
          )}
          <IconButton sx={{ borderRadius: '5%' }} component={Link} to={`/albums/${id}`}>
            подробнее
            <ArrowForwardIcon />
          </IconButton>
          {user?.role === 'admin' && (
            <LoadingButton
              type='button'
              onClick={handleDelete}
              color='error'
              loading={isDeleting}
              loadingPosition='end'
              endIcon={<DeleteForeverIcon />}
              variant='contained'
            >
              <span>delete</span>
            </LoadingButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;
