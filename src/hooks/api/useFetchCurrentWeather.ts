import { useQuery } from '@tanstack/react-query';

import { endpoints } from 'global/endpoints';
import { settings } from 'global/settings';
import { ILatLon, IWeatherSearchParams } from 'type';
import http from 'utils/http';
import { stringifySearchParams } from 'utils/searchParams';

const fetchCurrentWeathers = (searchParams: IWeatherSearchParams) => {
  const searchParamsWithAppId = { ...searchParams, units: 'metric', appid: settings.API_TOKEN };
  const stringifiedParams = `?${stringifySearchParams(searchParamsWithAppId)}`;
  const endpoint = endpoints.currentWeather + stringifiedParams;

  return http().get(endpoint);
};

export function useFetchCurrentWeathers(searchParams: IWeatherSearchParams) {
  return useQuery(['fetchCurrentWeathers', searchParams], () => fetchCurrentWeathers(searchParams), {
    enabled: (searchParams.lat && searchParams.lon) || searchParams.q ? true : false,
  });
}
