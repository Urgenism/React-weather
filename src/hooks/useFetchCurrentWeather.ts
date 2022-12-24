import { useQuery } from '@tanstack/react-query';

import { endpoints } from 'global/endpoints';
import { settings } from 'global/settings';
import http from 'utils/http';
import { stringifySearchParams } from 'utils/searchParams';

export interface ILatLon {
  lat: number | null;
  lon: number | null;
}

const fetchCurrentWeathers = (searchParams: ILatLon) => {
  const searchParamsWithAppId = { ...searchParams, appid: settings.API_TOKEN };
  const stringifiedParams = `?${stringifySearchParams(searchParamsWithAppId)}`;
  const endpoint = endpoints.currentWeather + stringifiedParams;

  return http().get(endpoint);
};

export function useFetchCurrentWeathers(searchParams: ILatLon) {
  return useQuery(['fetchCurrentWeathers', searchParams], () => fetchCurrentWeathers(searchParams), {
    enabled: searchParams.lat && searchParams.lon ? true : false,
  });
}
