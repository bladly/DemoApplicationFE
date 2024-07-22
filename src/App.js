import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import { Container, Typography } from '@mui/material';

const App = () => {
  const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={['places']} // Include any necessary libraries
      loadingElement={<div>Loading...</div>}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Google Places Autocomplete
        </Typography>
        <SearchBar setLocation={setLocation} />
        <Map location={location} />
      </Container>
    </LoadScript>
  );
};

export default App;