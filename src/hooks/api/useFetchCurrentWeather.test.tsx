import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { describe, it } from 'vitest';

import currentWeatherData from 'mock/currentWeather.json';
import { server } from 'setupTests';
import { createQueryProviderWrapper } from 'utils/createQueryProviderWrapper';

import { useFetchCurrentWeathers } from './useFetchCurrentWeather';

describe('useFetchCurrentWeather hook', () => {
  it('should return current weather successfully', async () => {
    const { result, waitFor } = renderHook(() => useFetchCurrentWeathers({ lat: 10, lon: 10 }), {
      wrapper: createQueryProviderWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(currentWeatherData);
  });

  it('should return error when fetching current weather fails', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result, waitFor } = renderHook(() => useFetchCurrentWeathers({ lat: 10, lon: 10 }), {
      wrapper: createQueryProviderWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
