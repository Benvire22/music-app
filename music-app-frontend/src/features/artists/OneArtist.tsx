import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchingOneArtist, selectOneArtist } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';

const OneArtist: React.FC = () => {
  const { artistId } = useParams() as { artistId: string };
  const artist = useAppSelector(selectOneArtist);
  const isFetching = useAppSelector(selectFetchingOneArtist);
  const dispatch = useAppDispatch();
  console.log(artistId);

  useEffect(() => {
    try {
      void dispatch(fetchOneArtist(artistId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, artistId]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no Artists here!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (artist) {
    console.log(artist);
    content = <div>{artist.name}</div>
  }

  return artist && (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to="/">
          Back to Artists
        </Button>
      </Grid>
      {content}
    </Grid>
  );
};

export default OneArtist;
