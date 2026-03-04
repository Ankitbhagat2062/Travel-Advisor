import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Box, Typography } from '@material-ui/core';
import './style.css';

// Fix for default marker icons in Leaflet - use CDN URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (fillColor) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: ${fillColor};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const LeafletMap = ({ 
  places, 
  coordinates, 
  setCoordinates, 
  onBoundsChange, 
  onMarkerClick,
  isFullscreen,
  toggleFullscreen,
  handleZoomIn,
  handleZoomOut,
  handleCenterOnUser
}) => {
  const leafletMapRef = useRef(null);

  const defaultCenter = {
    lat: coordinates?.lat || 40.7128,
    lng: coordinates?.lng || -74.0060
  };

  const center = [defaultCenter.lat, defaultCenter.lng];

  // Leaflet Map Events Handler
  const LeafletMapEvents = () => {
    useMapEvents({
      moveend: () => {
        if (leafletMapRef.current && onBoundsChange) {
          const bounds = leafletMapRef.current.getBounds();
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          onBoundsChange({
            ne: { lat: ne.lat, lng: ne.lng },
            sw: { lat: sw.lat, lng: sw.lng }
          });
        }
      }
    });
    return null;
  };

  // Fit bounds to markers
  const FitBounds = ({ places }) => {
    const map = useMap();
    
    useEffect(() => {
      if (places && places.length > 0) {
        const validPlaces = places.filter(p => p.latitude && p.longitude);
        if (validPlaces.length > 0) {
          const bounds = L.latLngBounds(
            validPlaces.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)])
          );
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }, [places, map]);
    
    return null;
  };

  const handleMarkerClick = (place) => {
    if (onMarkerClick) {
      onMarkerClick(place);
    }
  };

  return (
    <Box className={`map-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <MapContainer 
        center={center} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        ref={leafletMapRef}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletMapEvents />
        <FitBounds places={places} />
        
        {/* Place Markers */}
        {places && places.map((place) => {
          if (!place.latitude || !place.longitude) return null;
          
          const lat = parseFloat(place.latitude);
          const lng = parseFloat(place.longitude);
          
          if (isNaN(lat) || isNaN(lng)) return null;

          const category = place.category?.key || place.ranking_category || '';
          let fillColor = '#ff5252';
          
          if (category.includes('restaurant')) {
            fillColor = '#ff9800';
          } else if (category.includes('hotel')) {
            fillColor = '#2196f3';
          } else {
            fillColor = '#4caf50';
          }

          return (
            <LeafletMarker
              key={place.location_id}
              position={[lat, lng]}
              icon={createCustomIcon(fillColor)}
              eventHandlers={{
                click: () => handleMarkerClick(place),
              }}
            >
              <Popup>
                <Box className="leaflet-popup">
                  <Typography variant="subtitle1" className="info-title">
                    {place.name}
                  </Typography>
                  <Typography variant="body2" className="info-rating">
                    Rating: {place.rating} ({place.num_reviews} reviews)
                  </Typography>
                </Box>
              </Popup>
            </LeafletMarker>
          );
        })}
      </MapContainer>

      {/* Map Controls */}
      <Box className="map-controls">
        <Box onClick={handleZoomIn} className="control-button" title="Zoom In" component="button">
          <span className="control-icon">+</span>
        </Box>
        <Box onClick={handleZoomOut} className="control-button" title="Zoom Out" component="button">
          <span className="control-icon">-</span>
        </Box>
        <Box onClick={handleCenterOnUser} className="control-button" title="My Location" component="button">
          <span className="control-icon">📍</span>
        </Box>
        <Box onClick={toggleFullscreen} className="control-button" title="Fullscreen" component="button">
          <span className="control-icon">{isFullscreen ? '⛶' : '⛶'}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default LeafletMap;
