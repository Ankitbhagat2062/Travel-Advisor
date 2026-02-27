# Implementation Plan - Travel Advisor App

## Current State Analysis

### Existing Files (Already Set Up):
- `src/api/index.js` - API client with getPlaceData function
- `src/components/ui/Rating.jsx` - Custom Rating component using MUI icons
- `src/components/ui/Alert.jsx` - Custom Alert component
- `src/components/ui/Skeleton.jsx` - Custom Skeleton component
- `src/components/PlaceDetails/PlaceDetails.jsx` - Detailed place view (mostly complete)
- `package.json` - All dependencies installed

### Files Needing Implementation:
1. **Header.jsx** - Needs search bar, weather widget, category filters
2. **List.jsx** - Needs place cards with filtering
3. **Map.jsx** - Needs Google Maps integration with markers
4. **App.js** - Needs state management to connect components

## Implementation Steps

### Step 1: Update App.js with State Management
- Add state for: places, filteredPlaces, selectedPlace, type (restaurant/hotel/attraction), coordinates, bounds
- Add functions to update state and pass to child components

### Step 2: Implement Header Component
- Add logo/title
- Add search input with location icon
- Add category filter chips (Restaurants, Hotels, Attractions)
- Add weather widget (optional - can be placeholder)

### Step 3: Implement List Component
- Add PlaceCard sub-component
- Implement card layout with image, name, rating, price, cuisine
- Add filtering by type
- Add skeleton loading state
- Connect to parent state

### Step 4: Implement Map Component
- Integrate @react-google-maps/api
- Add custom markers for places
- Implement marker click to select place
- Connect to parent state

### Step 5: Update PlaceDetails
- Make it work as modal/drawer instead of always visible
- Connect to selectedPlace from parent state

## Key Technical Details

### API Usage:
- Type parameter: "restaurants", "hotels", "attractions"
- Boundary params: sw (southwest), ne (northeast) coordinates

### UI Layout:
- Left side: List with filters (xs=12, md=4)
- Right side: Map (xs=12, md=8)
- PlaceDetails: Modal overlay

### Material-UI Icons to Use:
- Search, LocationOn, FilterList, Restaurant, Hotel, Attractions
- Use @material-ui/icons (v4) - these are not deprecated
