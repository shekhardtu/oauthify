import { useEffect, useRef } from 'react';
import { oauthMessageHandler } from '../core/OAuthMessageHandler.service';
import { OAuthError, OAuthResult } from '../types/oauthify.types';

interface UseOAuthListenerOptions {
  onSuccess?: (result: OAuthResult) => void;
  onError?: (error: OAuthError) => void;
  provider?: string;
}

export function useOAuthListener(options: UseOAuthListenerOptions): void {
  const { onSuccess, onError, provider } = options;
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Cleanup any existing listener
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    // Subscribe to messages
    cleanupRef.current = oauthMessageHandler.subscribe((result) => {
      // Filter by provider if specified
      if (provider && result.provider !== provider) {
        return;
      }

      if ('error' in result && result.error) {
        onError?.(result as OAuthError);
      } else if ('code' in result) {
        onSuccess?.(result as OAuthResult);
      }
    });

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [onSuccess, onError, provider]);
}