import { rest } from 'msw';

import { endpoints } from 'global/endpoints';
import currentWeatherMock from 'mock/currentWeather.json';
import dailyForecastMock from 'mock/dailyForecast.json';
import { ICurrentWeatherData, IDailyForecastData } from 'type';

export const handlers = [
  rest.get(`*${endpoints.currentWeather}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<ICurrentWeatherData>(currentWeatherMock));
  }),

  rest.get(`*${endpoints.dailyForecast}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<IDailyForecastData>(dailyForecastMock));
  }),
];
