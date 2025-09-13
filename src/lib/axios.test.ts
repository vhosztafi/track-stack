import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const getMock = vi.fn();
let createMock: ReturnType<typeof vi.fn>;

const isAxiosError = (e: unknown): e is { __isAxiosError: boolean } =>
  typeof e === 'object' &&
  e !== null &&
  '__isAxiosError' in e &&
  Boolean((e as { __isAxiosError: unknown }).__isAxiosError);

vi.mock('axios', () => {
  createMock = vi.fn(() => ({ get: getMock }));
  return {
    default: {
      create: createMock,
      isAxiosError,
    },
    create: createMock,
    isAxiosError,
  };
});

describe('lib/axios', () => {
  beforeEach(() => {
    getMock.mockReset();
    createMock?.mockClear?.();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('configures axios instance with baseURL and timeout', async () => {
    vi.stubEnv('VITE_TFL_APP_ID', '');
    vi.stubEnv('VITE_TFL_APP_KEY', '');

    const mod = await import('./axios');
    getMock.mockResolvedValueOnce({ data: {} });
    await mod.get('/noop');

    expect(createMock).toHaveBeenCalledTimes(1);
    const configArg = createMock.mock.calls[0][0];
    expect(configArg.baseURL).toBe('https://api.tfl.gov.uk');
    expect(configArg.timeout).toBe(10_000);
  });

  it('get merges params and TfL keys when present', async () => {
    vi.stubEnv('VITE_TFL_APP_ID', 'my-id');
    vi.stubEnv('VITE_TFL_APP_KEY', 'my-key');

    const { get } = await import('./axios');
    getMock.mockResolvedValueOnce({ data: { ok: true } });

    const res = await get<{ ok: boolean }>('/Line/Mode/Tube/Status', {
      params: { a: 1 },
    });

    expect(res.ok).toBe(true);
    expect(getMock).toHaveBeenCalledTimes(1);
    const [_url, cfg] = getMock.mock.calls[0];
    expect(_url).toBe('/Line/Mode/Tube/Status');
    expect(cfg.params).toEqual({ a: 1, app_id: 'my-id', app_key: 'my-key' });
  });

  it('get omits TfL keys when absent', async () => {
    vi.stubEnv('VITE_TFL_APP_ID', '');
    vi.stubEnv('VITE_TFL_APP_KEY', '');

    const { get } = await import('./axios');
    getMock.mockResolvedValueOnce({ data: { ok: true } });

    await get('/foo', { params: { a: 1 } });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_url, cfg] = getMock.mock.calls[0];
    expect(cfg.params).toEqual({ a: 1 });
  });

  it('toMessage extracts message from AxiosError response data', async () => {
    const { toMessage } = await import('./axios');

    const axiosErr = {
      __isAxiosError: true,
      message: 'Fallback',
      response: { status: 400, data: { message: 'Bad Request' } },
    };

    expect(toMessage(axiosErr)).toEqual({ status: 400, message: 'Bad Request' });
  });

  it('toMessage falls back to AxiosError.message when no data.message', async () => {
    const { toMessage } = await import('./axios');

    const axiosErr = {
      __isAxiosError: true,
      message: 'Network Error',
      response: { status: 502, data: { notMessage: true } },
    };

    expect(toMessage(axiosErr)).toEqual({ status: 502, message: 'Network Error' });
  });

  it('toMessage returns generic message for non-Axios errors', async () => {
    const { toMessage } = await import('./axios');

    expect(toMessage(new Error('boom'))).toEqual({ message: 'Unexpected error' });
    expect(toMessage(123 as never)).toEqual({ message: 'Unexpected error' });
  });
});
