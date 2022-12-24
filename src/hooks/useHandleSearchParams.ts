import { useEffect, useState } from 'react';

import { IWeatherSearchParams } from 'type';

import { useFindCurrentLatLong } from './useFindCurrentLatLon';

export const useHandleSearchParams = () => {
  const latLng = useFindCurrentLatLong();

  const [searchParams, setSearchParams] = useState<IWeatherSearchParams>(latLng);

  useEffect(() => {
    setSearchParams(latLng);
  }, [latLng]);

  const handleFormSubmit = (value: string) => {
    if (!value.trim()) return;
    setSearchParams({ q: value });
  };

  return { searchParams, handleFormSubmit };
};
