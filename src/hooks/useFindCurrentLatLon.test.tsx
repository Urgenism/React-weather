import { renderHook, act } from '@testing-library/react-hooks';
import { describe, expect, it, vi } from 'vitest';

import { DEFAULT_LAT, DEFAULT_LON } from 'global/constants';

import { useFindCurrentLatLong } from './useFindCurrentLatLon';

describe('useFindCurrentLatLon hook', () => {
  it('should return default lat and lon value', () => {
    const { result } = renderHook(() => useFindCurrentLatLong());

    expect(result.current).toEqual({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
  });

  it('should return browser lat and lon value', () => {
    const mockGeolocation = {
      geolocation: {
        getCurrentPosition: vi.fn().mockImplementationOnce(success =>
          Promise.resolve(
            success({
              coords: {
                latitude: 10,
                longitude: 10,
              },
            })
          )
        ),
      },
    };
    vi.stubGlobal('navigator', mockGeolocation);

    const { result } = renderHook(() => useFindCurrentLatLong());

    expect(result.current).toEqual({ lat: 10, lon: 10 });
  });
});
