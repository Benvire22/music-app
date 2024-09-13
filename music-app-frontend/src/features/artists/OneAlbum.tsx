import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '../../app/hooks.ts';

const OneArtist = () => {
  const { albumId } = useParams() as { albumId: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetchOneAlbum(id));
  }, [dispatch, albumId]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Button variant="text" startIcon={<ArrowBackIcon />} component={Link} to="/">
          Back to products
        </Button>
      </Grid>
      {/*{isFetching && (*/}
      {/*  <Grid item>*/}
      {/*    <CircularProgress />*/}
      {/*  </Grid>*/}
      {/*)}*/}
    </Grid>
  );
};

export default OneArtist;
