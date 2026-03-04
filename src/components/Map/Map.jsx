import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { 
  Box, 
  Typography, 
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { 
  MyLocation as LocationIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from '@material-ui/icons';
import LeafletMap from './LeafletMap';
import './style.css';

const Map = ({ 
  places, 
  coordinates, 
  setCoordinates, 
  onBoundsChange, 
  onMarkerClick,
}) => {
  const [map, setMap] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [infoWindowPlace, setInfoWindowPlace] = useState(null);
  const [useLeaflet, setUseLeaflet] = useState(false);
  const [loading, setLoading] = useState(true);

  // Default center - NYC
  const defaultCenter = {
    lat: coordinates?.lat || 40.7128,
    lng: coordinates?.lng || -74.0060
  };

  // Check if we should use Google Maps
  const shouldUseGoogleMaps = () => {
    const useGoogleMaps = process.env.REACT_APP_USE_GOOGLE_MAPS === 'true';
    const hasApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY && 
                      process.env.REACT_APP_GOOGLE_MAPS_API_KEY.trim() !== '';
    return useGoogleMaps && hasApiKey;
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: shouldUseGoogleMaps() ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY : '',
  });

  // Determine if we should use Leaflet
  useEffect(() => {
    // Use Leaflet if:
    // 1. Not configured to use Google Maps, OR
    // 2. There's a load error, OR  
    // 3. Google Maps failed to load
    if (!shouldUseGoogleMaps() || loadError || !isLoaded) {
      setUseLeaflet(true);
    }
    setLoading(false);
  }, [loadError, isLoaded]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  // Google Maps onLoad handler
  const onLoad = useCallback((map) => {
    setMap(map);
    
    const bounds = new window.google.maps.LatLngBounds();
    if (places && places.length > 0) {
      places.forEach((place) => {
        if (place.latitude && place.longitude) {
          bounds.extend({
            lat: parseFloat(place.latitude),
            lng: parseFloat(place.longitude)
          });
        }
      });
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    }
    
    const listener = map.addListener('idle', () => {
      const bounds = map.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        onBoundsChange({
          ne: { lat: ne.lat(), lng: ne.lng() },
          sw: { lat: sw.lat(), lng: sw.lng() }
        });
      }
    });

    return () => {
      listener.remove();
    };
  }, [places, onBoundsChange]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleCenterOnUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCoordinates(pos);
          if (map) {
            map.panTo(pos);
            map.setZoom(14);
          }
        },
        () => {
          console.error('Error: The Geolocation service failed.');
        }
      );
    }
  };

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getMarkerIcon = (place) => {
    const category = place.category?.key || place.ranking_category || '';
    let fillColor = '#ff5252';
    
    if (category.includes('restaurant')) {
      fillColor = '#ff9800';
    } else if (category.includes('hotel')) {
      fillColor = '#2196f3';
    } else {
      fillColor = '#4caf50';
    }

    return {
      path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
      scale: 10,
      fillColor: fillColor,
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#ffffff'
    };
  };

  const handleMarkerClick = (place) => {
    onMarkerClick(place);
    setInfoWindowPlace(place);
  };

  // Show loading while determining which map to use
  if (loading) {
    return (
      <Box className="map-loading">
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: 8 }}>
          Loading map...
        </Typography>
      </Box>
    );
  }

  // Render Leaflet when no API key or error
  if (useLeaflet) {
    return (
      <LeafletMap
        places={places}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        onBoundsChange={onBoundsChange}
        onMarkerClick={onMarkerClick}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleCenterOnUser={handleCenterOnUser}
      />
    );
  }

  // Render error state for Google Maps
  if (loadError) {
    return (
      <Box className="map-error">
        <Typography variant="h6">Error loading Google Maps</Typography>
        <Typography variant="body2">
          Please check your Maps API key configuration.
        </Typography>
      </Box>
    );
  }

  // Render loading state for Google Maps
  if (!isLoaded) {
    return (
      <Box className="map-loading">
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: 8 }}>
          Loading map...
        </Typography>
      </Box>
    );
  }

  // Original Google Maps render
  return (
    <Box className={`map-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {/* Place Markers */}
        {places && places.map((place) => {
          if (!place.latitude || !place.longitude) return null;
          
          const lat = parseFloat(place.latitude);
          const lng = parseFloat(place.longitude);
          
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={place.location_id}
              position={{ lat, lng }}
              onClick={() => handleMarkerClick(place)}
              icon={getMarkerIcon(place)}
            />
          );
        })}

        {/* Info Window for selected place */}
        {infoWindowPlace && (
          <InfoWindow
            position={{
              lat: parseFloat(infoWindowPlace.latitude),
              lng: parseFloat(infoWindowPlace.longitude)
            }}
            onCloseClick={() => setInfoWindowPlace(null)}
          >
            <Box className="info-window">
              <Typography variant="subtitle1" className="info-title">
                {infoWindowPlace.name}
              </Typography>
              <Typography variant="body2" className="info-rating">
                Rating: {infoWindowPlace.rating} ({infoWindowPlace.num_reviews} reviews)
              </Typography>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Map Controls */}
      <Box className="map-controls">
        <IconButton onClick={handleZoomIn} className="control-button" title="Zoom In">
          <ZoomInIcon />
        </IconButton>
        <IconButton onClick={handleZoomOut} className="control-button" title="Zoom Out">
          <ZoomOutIcon />
        </IconButton>
        <IconButton onClick={handleCenterOnUser} className="control-button" title="My Location">
          <LocationIcon />
        </IconButton>
        <IconButton onClick={toggleFullscreen} className="control-button" title="Fullscreen">
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Map;
