"use client";

import React, { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface LocationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

export default function LocationSheet({ isOpen, onClose, onLocationSelect }: LocationSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would typically call the Google Geocoding API to get coordinates
  };

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, []);

  const handleUseCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(pos);
          map?.panTo(pos);
          setIsLoadingLocation(false);
        },
        () => {
          console.log('Error: The Geolocation service failed.');
          setIsLoadingLocation(false);
        }
      );
    } else {
      console.log('Error: Your browser doesn\'t support geolocation.');
      setIsLoadingLocation(false);
    }
  };

  const handleConfirmLocation = () => {
    onLocationSelect(markerPosition);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-full">
        <SheetHeader>
          <SheetTitle>Set Your Location</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={handleUseCurrentLocation}
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4 mr-2" />
            )}
            {isLoadingLocation ? 'Getting Location...' : 'Use Current Location'}
          </Button>
          <div className="mt-6 rounded-lg overflow-hidden">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={markerPosition}
                zoom={16}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            ) : <div>Loading...</div>}
          </div>
          <Button 
            className="w-full mt-4" 
            onClick={handleConfirmLocation}
          >
            Confirm Location
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}