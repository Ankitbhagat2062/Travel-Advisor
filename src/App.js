import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { Grid, CssBaseline } from '@material-ui/core';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import { getPlaceData } from './api';

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [type, setType] = useState('restaurants');
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 }); // Default: NYC
  const [bounds, setBounds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);

  // Default coordinates (New York City)
  useEffect(() => {
    setCoordinates({ lat: 40.7128, lng: -74.0060 });
  }, []);

  // Fetch places when bounds or type changes
  useEffect(() => {
    if (bounds && bounds.sw && bounds.ne) {
      setLoading(true);
      const handler = setTimeout(() => {
        getPlaceData({ type, sw: bounds.sw, ne: bounds.ne })
          .then((data) => {
            if (data) {
              setPlaces(data);
              setFilteredPlaces(data);
              setChildClicked(null);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }, 500); // Wait for 500ms after the last change before making the API call

      // Cleanup function to clear the timeout if searchTerm changes before the timeout
      return () => {
        clearTimeout(handler);
      };
    }
  }, [bounds, type]);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setChildClicked(place.location_id);
  };

  const handleListItemClick = (place) => {
    setSelectedPlace(place);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const handleBoundsChange = (newBounds) => {
    setBounds(newBounds);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Header
        onTypeChange={handleTypeChange}
        currentType={type}
        setCoordinates={setCoordinates}
      />
      <Grid container spacing={3} style={{ width: '100%', margin: 0 }}>
        <Grid item xs={12} md={4} style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            loading={loading}
            childClicked={childClicked}
            onPlaceClick={handleListItemClick}
            onPlaceSelect={handlePlaceSelect}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ height: 'calc(100vh - 64px)' }}>
          <Map
            places={filteredPlaces.length ? filteredPlaces : places}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            onBoundsChange={handleBoundsChange}
            onMarkerClick={handleMarkerClick}
            selectedPlace={selectedPlace}
          />
        </Grid>
      </Grid>
      <PlaceDetails
        place={selectedPlace}
        open={!!selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
    </div>
  );
}

export default App;
