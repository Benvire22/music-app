import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, IconButton, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { API_URL } from '../../../constants';
import imageNotFound from '../../../assets/images/image-not-found.png';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../types';
import { fetchArtists, togglePublished } from '../artistsThunks';

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
  admin?: User;
}

const ArtistItem: React.FC<Props> = ({ id, name, photo, isPublished, admin }) => {
  let cardImage = imageNotFound;
  const dispatch = useAppDispatch();

  if (photo) {
    cardImage = `${API_URL}/${photo}`;
  }

  const togglePublish = async () => {
    try {
      await dispatch(togglePublished(id)).unwrap();
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
          {admin && admin.role === 'admin' && (
            <LoadingButton
              type='button'
              onClick={togglePublish}
              fullWidth
              color='primary'
              loading={false}
              loadingPosition='end'
              endIcon={<ArrowForwardIcon />}
              variant='contained'
            >
              <span>Publish</span>
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
