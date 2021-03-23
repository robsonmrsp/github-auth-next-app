import React, { useRef, useEffect, useState, useCallback } from 'react';
import { getMap, addMarkerToLocation, plotRouteByLocations, plotRoute } from '@/services/mapServices';

let map = null;
export const MapContainer = ({ location, secondLocation }) => {
  const mapRef = useRef();
  const [mapInfo, setMapInfo] = useState('');

  useEffect(() => {
    map = getMap(mapRef.current, { zoom: 16 });
    addMarkerToLocation(map, location, { markOnCenter: true });
  }, []);

  const updateMap = useCallback(async () => {
    setMapInfo('');
    if (location && secondLocation) {
      const route = await plotRouteByLocations(map, location, secondLocation);
      addMarkerToLocation(map, location, { markOnCenter: true });
      addMarkerToLocation(map, secondLocation, { markOnCenter: true });
      if (route.distance) {
        setMapInfo(`Distancia total aproximadamente: ${parseInt(route.distance / 1000)} km`);
      }
    }
  }, [location, secondLocation]);

  useEffect(() => {
    updateMap();
  }, [updateMap]);

  return (
    <div className="container is-max-desktop">
      {mapInfo}
      <div ref={mapRef} style={{ height: '480px' }} id="myMap"></div>
    </div>
  );
};
