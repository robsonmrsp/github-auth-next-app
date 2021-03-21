import React, { useRef, useEffect } from 'react';

export const MapContainer = ({ location }) => {
  const mapRef = useRef();

  useEffect(() => {
    const platform = new H.service.Platform({
      app_id: 'aYuVBS2vsrMhXCX6vr1z',



      
      app_code: '6N0-4OVOUwofh2KU9eWgXQ',
      useHTTPS: true,
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.normal.map, {
      zoom: 10,
      center: { lat: 52.5, lng: 13.4 },
    });
    const position = {
      lat: 52.5,
      lng: 13.4,
    };
    const marker = new H.map.Marker(position);
    map.setCenter(position);
    map.addObject(marker);
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    if (location) {
      var geocodingParams = {
        searchText: location,
      };

      const onResult = (result) => {
        const location = result.Response.View[0].Result[0];
        const pos = {
          lat: location.Location.DisplayPosition.Latitude,
          lng: location.Location.DisplayPosition.Longitude,
        };
        const m = new H.map.Marker(pos);
        map.setCenter(pos);
        map.addObject(m);
      };

      const geocoder = platform.getGeocodingService();
      geocoder.geocode(geocodingParams, onResult, (e) => {
        alert(e);
      });
    }
  }, [mapRef]);

  return (
    <div className="container is-max-desktop">
      <div ref={mapRef} style={{ height: '480px' }} id="myMap"></div>
    </div>
  );
};
