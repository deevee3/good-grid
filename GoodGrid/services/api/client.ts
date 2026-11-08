type ApiRequestOptions = RequestInit & {
  timeoutMs?: number;
};

function getApiBaseUrl(): string {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL. Add it in your local env to enable live store data.');
  }

  return baseUrl.replace(/\/+$/, '');
}

function toPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export async function requestJson<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { timeoutMs = 10000, headers, ...requestOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${getApiBaseUrl()}${toPath(path)}`, {
      ...requestOptions,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      let details = '';

      try {
        details = await response.text();
      } catch {
        details = '';
      }

      throw new Error(`API request failed (${response.status} ${response.statusText})${details ? `: ${details}` : ''}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}
