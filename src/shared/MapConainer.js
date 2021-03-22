import React, { useRef, useEffect } from 'react';
import { getMap, addMarkerToLocation, plotRouteByLocations, plotRoute } from '@/services/mapServices';

export const MapContainer = ({ location, secondLocation,  center, routePoints = [] }) => {
  const mapRef = useRef();
  let map = null;

  useEffect(() => {
    map = getMap(mapRef.current, { zoom: 16 });
    addMarkerToLocation(map, location, { markOnCenter: true });
    // plotRoute(map, { latitude: '-3.877545', longitude: '-38.629777' }, { latitude: '-3.725925', longitude: '-38.523001' });


    plotRouteByLocations(map, 'Maracanau', 'Pacatuba');
  }, []);

  // useEffect(() => {
  //   plotRoute(map, { latitude: '-3.877545', longitude: '-38.629777' }, { latitude: '-3.725925', longitude: '-38.523001' });
  // }, [location, secondLocation]);

  return (
    <div className="container is-max-desktop">
      <div ref={mapRef} style={{ height: '480px' }} id="myMap"></div>
    </div>
  );
};
