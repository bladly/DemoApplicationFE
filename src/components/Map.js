import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import useGoogleMaps from '../hooks/useGoogleMaps';

const Map = ({ location }) => {
  const isLoaded = useGoogleMaps();

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ height: '400px', width: '800px' }}
      center={location}
      zoom={10}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};

export default Map;