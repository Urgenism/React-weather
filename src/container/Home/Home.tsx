import React from 'react';

import CurrentWeather from 'components/CurrentWeather';
import DailyForecast from 'components/DailyForecast';
import { useFindCurrentLatLong } from 'hooks/useFindCurrentLatLon';

const Home = () => {
  const latLng = useFindCurrentLatLong();

  return (
    <div>
      <CurrentWeather latLng={latLng} />
      <DailyForecast latLng={latLng} />
    </div>
  );
};

export default Home;
