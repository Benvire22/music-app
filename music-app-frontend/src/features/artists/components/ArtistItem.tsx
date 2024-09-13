import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, IconButton, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { API_URL } from '../../../constants';
import imageNotFound from '../../../assets/images/image-not-found.png';

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
}

const ArtistItem: React.FC<Props> = ({ id, name, photo }) => {
  let cardImage = imageNotFound;

  if (photo) {
    cardImage = `${API_URL}/${photo}`;
  }

  return (
    <Grid sx={{width: '100%', margin: '20px 0 0 150px'}}>
      <Card sx={{ display: 'flex', p: 2 } }>
        <ImageCardMedia image={cardImage} title={name} />
        <CardHeader title={name} />
        <CardActions sx={{marginLeft: 'auto'}}>
          <IconButton component={Link} to={`/artists/${id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;
