import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { getBoolParam, useQueryParamsReadOnly } from './useQueryParamsReadOnly';

describe('useQueryParamsReadOnly', () => {
  const setSearch = (search: string) => {
    const url = search.startsWith('?') ? search : `?${search}`;
    window.history.replaceState(null, '', url);
  };

  const pushSearch = (search: string) => {
    const url = search.startsWith('?') ? search : `?${search}`;
    window.history.pushState(null, '', url);
  };

  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('returns URLSearchParams for the current location.search', () => {
    setSearch('?foo=bar&x=1');

    const { result } = renderHook(() => useQueryParamsReadOnly());

    expect(result.current.get('foo')).toBe('bar');
    expect(result.current.get('x')).toBe('1');
    expect(result.current.get('missing')).toBeNull();
  });

  it('updates when the popstate event fires (back/forward navigation)', () => {
    setSearch('?a=1');

    const { result } = renderHook(() => useQueryParamsReadOnly());
    expect(result.current.get('a')).toBe('1');

    act(() => {
      pushSearch('?a=2&b=ok');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current.get('a')).toBe('2');
    expect(result.current.get('b')).toBe('ok');
  });

  it('updates when the document visibility changes', () => {
    setSearch('?v=1');

    const { result } = renderHook(() => useQueryParamsReadOnly());
    expect(result.current.get('v')).toBe('1');

    act(() => {
      window.history.replaceState(null, '', '?v=2&extra=yes');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current.get('v')).toBe('2');
    expect(result.current.get('extra')).toBe('yes');
  });
});

describe('getBoolParam', () => {
  it('parses "true" and "false" strings to boolean', () => {
    const params = new URLSearchParams('a=true&b=false');
    expect(getBoolParam(params, 'a')).toBe(true);
    expect(getBoolParam(params, 'b')).toBe(false);
  });

  it('returns undefined for missing or non-boolean values', () => {
    const params = new URLSearchParams('x=1&y=yes&z=');
    expect(getBoolParam(params, 'missing')).toBeUndefined();
    expect(getBoolParam(params, 'x')).toBeUndefined();
    expect(getBoolParam(params, 'y')).toBeUndefined();
    expect(getBoolParam(params, 'z')).toBeUndefined();
  });
});
