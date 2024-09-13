import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotFound from '../../../assets/images/image-not-found.png';
import { API_URL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  name: string;
  releaseDate: number;
  image: string | null;
}

const AlbumItem: React.FC<Props> = ({ id, name, image, releaseDate }) => {
  let cardImage = imageNotFound;

  if (image) {
    cardImage = `${API_URL}/${image}`;
  }

  return (
    <Grid sx={{ width: '45%' }}>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={name} />
        <ImageCardMedia image={cardImage} title={name} />
        <CardContent>
          <strong>{releaseDate}</strong>
        </CardContent>
        <CardActions>
          <IconButton sx={{ borderRadius: '5%' }} component={Link} to={`/albums/${id}`}>
            подробнее
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;
