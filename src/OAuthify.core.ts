import { oauthMessageHandler } from './core/OAuthMessageHandler.service';
import { OAuthError, OAuthOptions, OAuthResult } from './types/oauthify.types';

// Window management
const activeWindows = new Map<string, Window>();

/**
 * Opens an OAuth authentication window with intelligent window management
 * @param authUrl - The complete authentication URL
 * @param provider - The OAuth provider name
 * @returns Window object or null if popup was blocked
 */
export function openOAuthWindow(authUrl: string, provider: string = 'default'): Window | null {
  // Check if we have an active window for this provider
  const existingWindow = activeWindows.get(provider);
  if (existingWindow && !existingWindow.closed) {
    existingWindow.focus();
    return existingWindow;
  }

  const width = 600;
  const height = 700;
  const left = Math.max(0, (window.innerWidth - width) / 2 + window.screenX);
  const top = Math.max(0, (window.innerHeight - height) / 2 + window.screenY);

  const newWindow = window.open(
    authUrl,
    `oauth_${provider}`,
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`,
  );

  if (newWindow) {
    activeWindows.set(provider, newWindow);

    // Clean up when window is closed
    const checkClosed = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkClosed);
        activeWindows.delete(provider);
      }
    }, 1000);
  }

  return newWindow;
}

/**
 * Builds OAuth authorization URL with provider-specific parameters
 * @param baseUrl - The provider's authorization endpoint
 * @param options - OAuth options including client ID, redirect URI, etc.
 * @returns Complete authorization URL
 */
export function buildAuthUrl(baseUrl: string, options: OAuthOptions): string {
  const {
    clientId,
    redirectUri,
    scope,
    state,
    responseType = 'code',
    additionalParams = {}
  } = options;

  // Build parameters object with proper naming for different providers
  const params: Record<string, string> = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: responseType,
    scope: scope || '',
    state: state || Math.random().toString(36).substring(2),
  };

  // Add any provider-specific additional parameters
  Object.entries(additionalParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params[key] = String(value);
    }
  });

  // Create URLSearchParams and build final URL
  const searchParams = new URLSearchParams(params);
  return `${baseUrl}?${searchParams.toString()}`;
}

export function handleOAuthCallback(): OAuthResult {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');
  let provider = 'unknown';

  try {
    if (state) {
      const stateObj = JSON.parse(decodeURIComponent(state));
      provider = stateObj.provider || 'unknown';
    }
  } catch (e) {
    console.error('Failed to parse state:', e);
  }

  const result: OAuthResult = {
    provider,
    code: params.get('code') ?? undefined,
    error: params.get('error') ?? undefined,
    error_description: params.get('error_description') ?? undefined,
    state: state ?? undefined
  };

  // Post message to opener window with type
  postOAuthMessage(result);

  return result;
}

export function listenForOAuthResult(callback: (result: OAuthResult | OAuthError) => void) {
  return oauthMessageHandler.subscribe(callback);
}

export function postOAuthMessage(result: OAuthResult | OAuthError) {
  if (window.opener && !window.opener.closed) {
    oauthMessageHandler.postMessage(window.opener, result);
  } else {
    console.error('No opener window found or window is closed');
  }
}
