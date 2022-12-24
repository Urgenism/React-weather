import { useEffect, useState } from 'react';

import { ILatLon } from 'type';

export const useFindCurrentLatLong = () => {
  const [latLong, setLatLong] = useState<ILatLon>({ lat: undefined, lon: undefined });

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
