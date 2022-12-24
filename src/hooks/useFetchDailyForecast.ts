import { useQuery } from '@tanstack/react-query';

import { endpoints } from 'global/endpoints';
import { settings } from 'global/settings';
import http from 'utils/http';
import { stringifySearchParams } from 'utils/searchParams';

export interface ILatLon {
  lat: number | null;
  lon: number | null;
}

const NEXT_DAY_SAME_TIME_INTERVAL = 8;

const fetchDailyForecast = (searchParams: ILatLon) => {
  const searchParamsWithAppId = { ...searchParams, appid: settings.API_TOKEN };
  const stringifiedParams = `?${stringifySearchParams(searchParamsWithAppId)}`;
  const endpoint = endpoints.dailyForecast + stringifiedParams;

  return http().get(endpoint);
};

export function useFetchDailyForecast(searchParams: ILatLon) {
  return useQuery(['fetchDailyForecast', searchParams], () => fetchDailyForecast(searchParams), {
    enabled: searchParams.lat && searchParams.lon ? true : false,
    select: data => {
      const daysList = data.list.filter((_: any, index: number) => index % NEXT_DAY_SAME_TIME_INTERVAL === 0);

      return { ...data, list: daysList };
    },
  });
}
