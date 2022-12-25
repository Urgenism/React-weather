import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';

import { DEFAULT_LAT, DETAULT_LON } from 'global/constants';
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
          setLatLong({ lat: DEFAULT_LAT, lon: DETAULT_LON });
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
      setLatLong({ lat: DEFAULT_LAT, lon: DETAULT_LON });
    }
  }, []);

  console.log(latLong, 'latLong');

  return latLong;
};
