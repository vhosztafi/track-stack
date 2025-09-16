import { useMemo, useSyncExternalStore } from 'react';

export function useQueryParamsReadOnly() {
  const subscribe = (onChange: () => void) => {
    const h = () => onChange();
    window.addEventListener('popstate', h);
    document.addEventListener('visibilitychange', h);
    return () => {
      window.removeEventListener('popstate', h);
      document.removeEventListener('visibilitychange', h);
    };
  };

  const getSnapshot = () => (typeof window === 'undefined' ? '' : window.location.search);

  const search = useSyncExternalStore(subscribe, getSnapshot, () => '');
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function getBoolParam(params: URLSearchParams, key: string) {
  const v = params.get(key);
  if (v === 'true') return true;
  if (v === 'false') return false;
  return undefined;
}
