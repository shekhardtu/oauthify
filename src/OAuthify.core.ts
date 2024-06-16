import { OAuthError, OAuthOptions, OAuthResult } from 'src/types/oauthify';

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
  const state = params.get('state');
  let provider;

  try {
    const stateObj = state ? JSON.parse(state) : {};
    provider = stateObj.provider;
  } catch (e) {
    // Invalid state parameter
    console.error('Failed to parse state:', e);
  }

  const result: OAuthResult = {
    provider,
    code: params.get('code') ?? undefined,
    error: params.get('error') ?? undefined,
    state: state ?? undefined
  };

  // Post message to opener window with type
  postOAuthMessage(result);

  return result;
}

export function listenForOAuthResult(callback: (result: OAuthResult | OAuthError) => void) {
  const messageHandler = (event: MessageEvent) => {


    // Check origin for security
    if (event.origin !== window.location.origin) {
      console.log('Origin mismatch:', event.origin);
      return;
    }

    // Check if the message is an OAuth response

    if (event.data) {

      if (event.data.error) {
        callback({
          error: event.data.error,
          provider: event.data.provider
        });
      } else {
        callback({
          ...event.data,
          code: event.data.code,
          provider: event.data.provider
        });
      }
    }
  };

  window.addEventListener('message', messageHandler);


  return () => {
    window.removeEventListener('message', messageHandler);
  };
}

export function postOAuthMessage(result: OAuthResult) {
  console.log('Posting OAuth message:', result);
  if (window.opener) {
    // Ensure we include the type in the message
    window.opener.postMessage({
      ...result,
      type: 'oauth_response',
      code: result.code,
      state: result.state,
      provider: result.provider,
      error: result.error
    }, window.location.origin);
  } else {
    console.error('No opener window found');
  }
}
