import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchingOneArtist, selectOneArtist } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';
import { fetchAlbums } from '../albums/albumsThunks';
import { selectAlbums } from '../albums/albumsSlice';
import AlbumItem from '../albums/components/AlbumItem';

const OneArtist: React.FC = () => {
  const { artistId } = useParams() as { artistId: string };
  const artist = useAppSelector(selectOneArtist);
  const albums = useAppSelector(selectAlbums);
  const isFetching = useAppSelector(selectFetchingOneArtist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchOneArtist(artistId)).unwrap();
      void dispatch(fetchAlbums(artistId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, artistId]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no tracks here!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (albums.length > 0) {
    content = albums.map((album) => (
      <AlbumItem key={album._id} id={album._id} name={album.name} releaseDate={album.releaseDate} image={album.image} />
    ));
  }

  return (
    artist && (
      <Grid container direction="column" spacing={3}>
        <Grid>
          <Grid container justifyContent="space-between" marginBottom="50px" alignItems="center">
            <Grid>
              <Typography variant="h4">{artist.name}</Typography>
            </Grid>
          </Grid>
          <Button variant="text" startIcon={<ArrowBackIcon />} component={Link} to="/">
            Back to all Artists
          </Button>
        </Grid>
        <Grid container>{content}</Grid>
      </Grid>
    )
  );
};

export default OneArtist;
