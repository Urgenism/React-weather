import { useEffect, useState } from 'react';

import { ILatLon } from './useFetchCurrentWeather';

export const useFindCurrentLatLong = () => {
  const [latLong, setLatLong] = useState<ILatLon>({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatLong({ lat, lon });
      });
    }
  }, []);

  return latLong;
};
