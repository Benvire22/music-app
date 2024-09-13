import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { API_URL } from '../../../constants';
import imageNotFound from '../../../assets/images/image-not-found.png';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  name: string;
  description: string | null;
  photo: string | null;
}

const ArtistItem: React.FC<Props> = ({ id, name, photo, description }) => {
  let cardImage = imageNotFound;

  if (photo) {
    cardImage = `${API_URL}/${photo}`;
  }

  return (
    <Grid sx={{ width: '300px' }}>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={name} />
        <ImageCardMedia image={cardImage} title={name} />
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/artists/${id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;
