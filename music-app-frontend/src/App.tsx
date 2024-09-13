import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import OneArtist from './features/artists/OneArtist.tsx';
import OneAlbum from './features/artists/OneAlbum.tsx';
import Artists from './features/artists/Artists.tsx';
const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/artists/:artistId" element={<OneArtist />} />
          <Route path="/albums/:albumsId" element={<OneAlbum />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
