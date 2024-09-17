import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';

interface Props {
  track: string;
  artist: string;
  datetime: Date;
}

const TrackHistoryItem: React.FC<Props> = ({track, artist, datetime}) => {
  return (
    <Grid>
      <Card sx={{ border: '2px solid lightblue', pt: '10px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">Composition:{track}</Typography>
          <Typography variant="h5">Artist: {artist}</Typography>
          <Typography variant="h5">played: {dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackHistoryItem;