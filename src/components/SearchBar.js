import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../redux/searchSlice';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import useGoogleMaps from '../hooks/useGoogleMaps';
import { Autocomplete } from '@react-google-maps/api';
import { Box } from '@mui/material';
import History from './History';

const SearchBar = ({ setLocation }) => {
  const [query, setQuery] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const dispatch = useDispatch();
  const isLoaded = useGoogleMaps();

  const handlePlaceChange = useCallback((place) => {
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setLocation(location);
      dispatch(addToHistory({
        description: place.formatted_address,
        place_id: place.place_id,
      }));
      setQuery(place.formatted_address);
    }
  }, [dispatch, setLocation]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <Box display="flex" alignItems="center">
      {isLoaded && (
        <Autocomplete
          onLoad={(autocomplete) => setAutocomplete(autocomplete)}
          onPlaceChanged={() => {
            const place = autocomplete.getPlace();
            if (place) {
              handlePlaceChange(place);
            }
          }}
        >
          <TextField
            label="Search for a place"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{ width: 445 }}
            InputProps={{
              endAdornment: (
                query && (
                  <IconButton onClick={handleClear} sx={{ p: 0 }}>
                    <ClearIcon />
                  </IconButton>
                )
              ),
            }}
          />
        </Autocomplete>
      )}
      <History />
    </Box>
  );
};

export default SearchBar;