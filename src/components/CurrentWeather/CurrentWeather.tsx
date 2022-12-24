import React, { useEffect, useState } from 'react';

import { ILatLon, useFetchCurrentWeathers } from 'hooks/useFetchCurrentWeather';

interface ICurrentWeatherProps {
  latLng: ILatLon;
}

const CurrentWeather: React.FC<ICurrentWeatherProps> = ({ latLng }) => {
  const { status, data } = useFetchCurrentWeathers(latLng);

  console.log(status, data);

  return <div>WeatherView</div>;
};

export default CurrentWeather;
