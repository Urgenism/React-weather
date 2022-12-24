import React from 'react';

import { ILatLon, useFetchDailyForecast } from 'hooks/useFetchDailyForecast';

interface IDailyForecastProps {
  latLng: ILatLon;
}

const Forecast: React.FC<IDailyForecastProps> = ({ latLng }) => {
  const { data, status } = useFetchDailyForecast(latLng);

  console.log(data, 'data');
  return (
    <div>
      {Array.isArray(data?.list) && data?.list.length
        ? data.list.map((item: any) => {
            const date = new Date(item.dt * 1000);

            return <div key={item.dt}>{date.toLocaleString()}</div>;
          })
        : null}
    </div>
  );
};

export default Forecast;
