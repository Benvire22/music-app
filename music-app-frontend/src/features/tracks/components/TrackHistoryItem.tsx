import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';

interface Props {
  track: string;
  artist: string;
  datetime: Date;
}

const TrackHistoryItem: React.FC<Props> = ({ track, artist, datetime }) => {
  return (
    <Grid size={10}>
      <Card sx={{ border: '2px solid lightblue', pt: '10px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Composition: <strong>{track}</strong>
          </Typography>
          <Typography sx={{ ml: 'auto', mr: 15 }} variant="h5">
            Artist: <strong>{artist}</strong>
          </Typography>
          <Typography variant="h5">played was: {dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackHistoryItem;
