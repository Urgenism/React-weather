import { renderHook, act } from '@testing-library/react-hooks';
import { describe, expect, it } from 'vitest';

import { DEFAULT_LAT, DEFAULT_LON } from 'global/constants';

import { useHandleSearchParams } from './useHandleSearchParams';

describe('useHandleSearchParams hook', () => {
  it('should return search params object with default lat and lon', () => {
    const { result } = renderHook(() => useHandleSearchParams());

    expect(result.current.searchParams).toEqual({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
  });

  it('should return search params object of q with test value when handleFormSubmit is called with "test" value', () => {
    const { result } = renderHook(() => useHandleSearchParams());

    act(() => {
      result.current.handleFormSubmit('test');
    });

    expect(result.current.searchParams).toEqual({ q: 'test' });
  });
});
