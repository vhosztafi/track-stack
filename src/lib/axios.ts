import axios, { type AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'https://api.tfl.gov.uk',
  timeout: 10_000,
});

function withTfLKeys(params: Record<string, string | number | boolean | undefined> = {}) {
  const app_id = import.meta.env.VITE_TFL_APP_ID;
  const app_key = import.meta.env.VITE_TFL_APP_KEY;
  return {
    ...params,
    ...(app_id ? { app_id } : {}),
    ...(app_key ? { app_key } : {}),
  };
}

type ErrorLike = { message: string };
function hasMessage(value: unknown): value is ErrorLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
}

export async function get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
  const res = await api.get<T>(url, {
    ...config,
    params: withTfLKeys(config.params as never),
  });
  return res.data;
}

export function toMessage(e: unknown) {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status;
    const data = e.response?.data as unknown;
    const msgFromData = hasMessage(data) ? data.message : undefined;
    const msg = msgFromData || e.message || 'Unexpected network error';
    return { status, message: msg };
  }
  return { message: 'Unexpected error' };
}
