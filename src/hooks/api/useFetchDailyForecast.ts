import { useQuery } from '@tanstack/react-query';

import { endpoints } from 'global/endpoints';
import { settings } from 'global/settings';
import { IWeatherSearchParams } from 'type';
import http from 'utils/http';
import { stringifySearchParams } from 'utils/searchParams';

const NEXT_DAY_SAME_TIME_INTERVAL = 8;

const fetchDailyForecast = (searchParams: IWeatherSearchParams) => {
  const searchParamsWithAppId = { ...searchParams, units: 'metric', appid: settings.API_TOKEN };
  const stringifiedParams = `?${stringifySearchParams(searchParamsWithAppId)}`;
  const endpoint = endpoints.dailyForecast + stringifiedParams;

  return http().get(endpoint);
};

export function useFetchDailyForecast(searchParams: IWeatherSearchParams) {
  return useQuery(['fetchDailyForecast', searchParams], () => fetchDailyForecast(searchParams), {
    enabled: (searchParams.lat && searchParams.lon) || searchParams.q ? true : false,
    select: data => {
      const daysList = data.list.filter((_: any, index: number) => index % NEXT_DAY_SAME_TIME_INTERVAL === 0);

      return { ...data, list: daysList };
    },
  });
}
