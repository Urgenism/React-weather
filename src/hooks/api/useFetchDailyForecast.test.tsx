import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { describe, it } from 'vitest';

import dailyForecastData from 'mock/dailyForecast.json';
import { server } from 'setupTests';
import { createQueryProviderWrapper } from 'utils/createQueryProviderWrapper';

import { useFetchDailyForecast } from './useFetchDailyForecast';

describe('useFetchCurrentWeather hook', () => {
  it('should return daily forecast data successfully', async () => {
    const { result, waitFor } = renderHook(() => useFetchDailyForecast({ lat: 10, lon: 10 }), {
      wrapper: createQueryProviderWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(dailyForecastData);
  });

  it('should return error when fetching daily forecast fails', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result, waitFor } = renderHook(() => useFetchDailyForecast({ lat: 10, lon: 10 }), {
      wrapper: createQueryProviderWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
