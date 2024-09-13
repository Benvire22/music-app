import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOneAlbum } from '../albums/albumsThunks';
import { selectFetchingOneAlbum, selectOneAlbum } from '../albums/albumsSlice';

const OneAlbum = () => {
  const { albumId } = useParams() as { albumId: string };
  const album = useAppSelector(selectOneAlbum);
  const isFetching = useAppSelector(selectFetchingOneAlbum);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchOneAlbum(albumId));
  }, [dispatch, albumId]);

  let content: React.ReactNode = (
    <CircularProgress />
  );

  if (isFetching) {
    content = (
      <Alert severity="info" sx={{ width: '100%' }}>
        There are no tracks here!
      </Alert>
    )
  } // else if (tracks.length > 0) {
  //   content = tracks.map((track) => (
  //     <TrackItem
  //       key={track._id}
  //       id={track._id}
  //       name={track.name}
  //       number={track.releaseDate}
  //       length={track.image}
  //     />
  //   ));
  // }

  return album && (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to="/">
          Back to all Artists
        </Button>
      </Grid>
      {content}
    </Grid>
  );
};

export default OneAlbum;