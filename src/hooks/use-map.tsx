import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map as LeafletMap, TileLayer} from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Hook that initializes and returns a Leaflet map instance bound to the provided container
// It also updates the map view when the city changes

type CityLike = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityLike
): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      // debug: creation
      // eslint-disable-next-line no-console
      console.debug('[useMap] creating Leaflet map on', mapRef.current, 'city:', city);
      const instance = new LeafletMap(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
      // eslint-disable-next-line no-console
      console.debug('[useMap] Leaflet instance created:', instance);
    }
  }, [mapRef, city]);

  useEffect(() => {
    if (map) {
      map.setView(
        [
          city.location.latitude,
          city.location.longitude
        ],
        city.location.zoom
      );
    }
  }, [map, city]);

  return map;
}

export default useMap;
