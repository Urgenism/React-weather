import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { useHandleInputChange } from './useHandleInputValue';

describe('useHandleInputValue hook', () => {
  it('should return empty value', () => {
    const { result } = renderHook(() => useHandleInputChange());

    expect(result.current.value).toEqual('');
  });

  it('should return test value when handleChange function is called with test value', () => {
    const { result } = renderHook(() => useHandleInputChange());

    act(() => {
      result.current.handleChange({ target: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toEqual('test');
  });
});
