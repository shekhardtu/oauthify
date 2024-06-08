interface OAuthOptions {
  clientId: string;
  redirectUri: string;
  scope?: string;
  state?: string;
  provider?: string;
}

interface OAuthResult {
  provider?: string;
  code?: string;
  error?: string;
}

export function openOAuthWindow(authUrl: string): Window | null {
  const width = 600;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  return window.open(
    authUrl,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top}`,
  );
}

export function buildAuthUrl(baseUrl: string, options: OAuthOptions): string {
  const { clientId, redirectUri, scope, state } = options;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope || '',
    state: state || Math.random().toString(36).substring(2),
  });

  return `${baseUrl}?${params.toString()}`;
}

export function handleOAuthCallback(): OAuthResult {
  const params = new URLSearchParams(window.location.search);

  const code = params.get('code');
  const error = params.get('error');

  if (code) {
    return { code };
  }

  if (error) {
    return { error };
  }

  return {};
}

export function listenForOAuthResult(callback: (result: OAuthResult) => void) {
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) {
      return;
    }

    if (event.data.code || event.data.error) {
      callback(event.data);
    }
  });
}
