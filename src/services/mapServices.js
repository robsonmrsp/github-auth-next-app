var platform;
var behavior;
var ui;

/**
 *
 * @param {*} mapContainer ref do conteiner do mapa
 * @param {*} objeto contendo as configuracoes do mapa. Por agora apenas o zoom
 * @returns
 */
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
  behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  ui = H.ui.UI.createDefault(map, defaultLayers);

  return map;
};

/**
 *
 * @param {*} map
 * @param {*} posicao Ponto onde o marcador precisa ser adicionado
 * @param {*} options uma descrição e um boolean indicando para centralizar o mapa nesse marcador.
 */
export const addMarker = (map, { latitude, longitude }, { markOnCenter = false, markerDescription } = {}) => {
  if (!map) {
    throw Error('you need a map to add marker, use getMap function');
  }
  const position = {
    lat: latitude,
    lng: longitude,
  };
  const marker = new H.map.Marker(position);
  if (markerDescription) {
    map.addObject(marker);
    const bubble = new H.ui.InfoBubble(position, {
      content: `<h6 class="chico-test">${markerDescription}</h6>`,
    });
    ui.addBubble(bubble);
  }
  if (markOnCenter) map.setCenter(position);
};

/**
 *
 * @param {*} map
 * @param {*} location endereço do maracador.
 * @param {*} options uma descrição e um boolean indicando para centralizar o mapa nesse marcador.
 */
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
      const res = result.Response.View[0].Result[0];
      addMarker(
        map,
        {
          latitude: res.Location.DisplayPosition.Latitude,
          longitude: res.Location.DisplayPosition.Longitude,
        },
        { markOnCenter, markerDescription: location }
      );
    },
    (e) => {
      console.log(e);
    }
  );
};

/**
 *
 * @param {*} queryLocation um endereço. Aqui supersimplificado contendo apenas uma cidade
 * @returns
 */
const getPositionByAddress = (queryLocation) => {
  return new Promise((resolve, reject) => {
    const geocoder = platform.getGeocodingService();
    geocoder.geocode(
      { searchText: queryLocation },
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

/**
 *
 * @param {*} map
 * @param {*} startLocation nome da localização inicial, exemplo Maracanaú
 * @param {*} endLocation nome da localização final, exemplo Pacatuba
 */
export const plotRouteByLocations = async (map, startLocation, endLocation) => {
  const startPoint = await getPositionByAddress(startLocation);
  const endPoint = await getPositionByAddress(endLocation);

  const route = await plotRoute(map, startPoint, endPoint);
  return route;
};

/**
 * @param {*} map
 * @param {*} startPoint posição em formato texto contento latitude e longitude
 * @param {*} endPoint mesmo...
 */
export const plotRoute = (map, startPoint, endPoint) => {
  return new Promise((resolve, reject) => {
    const params = {
      mode: 'fastest;car;traffic:enabled',
      waypoint0: `${startPoint.latitude},${startPoint.longitude}`,
      waypoint1: `${endPoint.latitude},${endPoint.longitude}`,
      representation: 'display',
      routeAttributes: 'summary',
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
        const route = success.response.route[0];
        route.shape.forEach((point) => {
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
        const distance = route.summary.distance;
        const theRoute = { routePolyline, distance };
        resolve(theRoute);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
