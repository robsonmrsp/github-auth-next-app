var platform;

export const getMap = (mapContainer, { zoom = 12 }) => {
  platform = new H.service.Platform({
    app_id: 'aYuVBS2vsrMhXCX6vr1z',
    app_code: '6N0-4OVOUwofh2KU9eWgXQ',
    useHTTPS: true,
  });

  const defaultLayers = platform.createDefaultLayers();
  const map = new H.Map(mapContainer, defaultLayers.normal.map, {
    zoom,
  });

  // Just add some map behavior on screen like pan and controls
  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  const ui = H.ui.UI.createDefault(map, defaultLayers);

  return map;
};
/**
 * params map, point, options
 */
export const addMarker = (map, { latitude, longitude }, { markOnCenter = false } = {}) => {
  if (!map) {
    throw Error('you need a map to add marker, use getMap function');
  }
  const position = {
    lat: latitude,
    lng: longitude,
  };
  const marker = new H.map.Marker(position);
  map.addObject(marker);

  if (markOnCenter) map.setCenter(position);
};

export const addMarkerToLocation = (map, location, { zoom = 12, markOnCenter = false } = {}) => {
  if (!location) {
    throw Error('you need to call passing a location, try something like "Fortaleza"');
  }
  const geocodingParams = {
    searchText: location,
  };
  const geocoder = platform.getGeocodingService();

  geocoder.geocode(
    geocodingParams,
    (result) => {
      const location = result.Response.View[0].Result[0];
      addMarker(
        map,
        {
          latitude: location.Location.DisplayPosition.Latitude,
          longitude: location.Location.DisplayPosition.Longitude,
        },
        { markOnCenter }
      );
    },
    (e) => {
      console.log(e);
    }
  );
};

const getPositionByAddress = (query) => {
  return new Promise((resolve, reject) => {
    const geocoder = platform.getGeocodingService();
    geocoder.geocode(
      { searchText: query },
      (result) => {
        if (result.Response.View.length > 0) {
          if (result.Response.View[0].Result.length > 0) {
            const location = result.Response.View[0].Result[0];
            const point = {
              latitude: location.Location.DisplayPosition.Latitude,
              longitude: location.Location.DisplayPosition.Longitude,
            };
            resolve(point);
          } else {
            reject({ message: 'no results found' });
          }
        } else {
          reject({ message: 'no results found' });
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};
export const plotRouteByLocations = async (map, startLocation, endLocation) => {
  const startPoint = await getPositionByAddress(startLocation);
  const endPoint = await getPositionByAddress(endLocation);

  plotRoute(map, startPoint, endPoint);
};

/**
 *
 * @param {*} map
 * @param {*} startPoint a position to be converted in waypoint like '37.7397,-121.4252'
 * @param {*} endPoint
 */
export const plotRoute = (map, startPoint, endPoint) => {
  const params = {
    mode: 'fastest;car;traffic:enabled',
    waypoint0: `${startPoint.latitude},${startPoint.longitude}`,
    waypoint1: `${endPoint.latitude},${endPoint.longitude}`,
    representation: 'display',
  };
  const startPosition = {
    lat: startPoint.latitude,
    lng: startPoint.longitude,
  };
  map.setCenter(startPosition);
  const routingService = platform.getRoutingService();
  routingService.calculateRoute(
    params,
    (success) => {
      const routeLineString = new H.geo.LineString();
      success.response.route[0].shape.forEach((point) => {
        const [lat, lng] = point.split(',');
        routeLineString.pushPoint({
          lat: lat,
          lng: lng,
        });
      });
      const routePolyline = new H.map.Polyline(routeLineString, {
        style: {
          lineWidth: 5,
        },
      });
      map.addObject(routePolyline);
    },
    (error) => {
      console.log(error);
    }
  );
};
