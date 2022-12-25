import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';

import { DEFAULT_LAT, DEFAULT_LON } from 'global/constants';
import { ILatLon } from 'type';

export const useFindCurrentLatLong = () => {
  const toast = useToast();
  const [latLong, setLatLong] = useState<ILatLon>({ lat: undefined, lon: undefined });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLatLong({ lat, lon });
        },
        error => {
          setLatLong({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
          toast({
            title: error.message,
            description: 'Default location will be Thapathali, NP',
            status: 'info',
            isClosable: true,
            position: 'top',
          });

          throw new Error(error.message);
        }
      );
    } else {
      setLatLong({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
    }
  }, []);

  return latLong;
};
