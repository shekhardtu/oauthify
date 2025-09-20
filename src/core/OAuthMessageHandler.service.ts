import { OAuthError, OAuthResult } from '../types/oauthify.types';

type MessageCallback = (result: OAuthResult | OAuthError) => void;

class OAuthMessageHandler {
  private static instance: OAuthMessageHandler;
  private listeners: Set<MessageCallback> = new Set();
  private isListening: boolean = false;
  private allowedOrigins: Set<string> = new Set();

  private constructor() {
    // Initialize with current origin by default
    this.allowedOrigins.add(window.location.origin);
  }

  static getInstance(): OAuthMessageHandler {
    if (!OAuthMessageHandler.instance) {
      OAuthMessageHandler.instance = new OAuthMessageHandler();
    }
    return OAuthMessageHandler.instance;
  }

  addAllowedOrigin(origin: string): void {
    this.allowedOrigins.add(origin);
  }

  removeAllowedOrigin(origin: string): void {
    this.allowedOrigins.delete(origin);
  }

  private handleMessage = (event: MessageEvent): void => {
    // Security: Validate origin
    if (!this.allowedOrigins.has(event.origin)) {
      console.warn('Rejected message from unauthorized origin:', event.origin);
      return;
    }

    // Validate message structure
    if (!event.data || typeof event.data !== 'object') {
      return;
    }

    // Check for OAuth response type
    if (event.data.type !== 'oauth_response') {
      return;
    }

    // Parse and validate OAuth result
    const result: OAuthResult | OAuthError = this.parseOAuthMessage(event.data);

    // Notify all listeners
    this.listeners.forEach(callback => {
      try {
        callback(result);
      } catch (error) {
        console.error('Error in OAuth message callback:', error);
      }
    });
  };

  private parseOAuthMessage(data: any): OAuthResult | OAuthError {
    // Handle error case
    if (data.error) {
      return {
        error: data.error,
        provider: data.provider || 'unknown',
        error_description: data.error_description
      } as OAuthError;
    }

    // Handle success case
    return {
      code: data.code,
      provider: data.provider || 'unknown',
      state: data.state,
      ...data
    } as OAuthResult;
  }

  private startListening(): void {
    if (!this.isListening) {
      window.addEventListener('message', this.handleMessage);
      this.isListening = true;
    }
  }

  private stopListening(): void {
    if (this.isListening && this.listeners.size === 0) {
      window.removeEventListener('message', this.handleMessage);
      this.isListening = false;
    }
  }

  subscribe(callback: MessageCallback): () => void {
    this.listeners.add(callback);
    this.startListening();

    // Return cleanup function
    return () => {
      this.listeners.delete(callback);
      this.stopListening();
    };
  }

  postMessage(target: Window, result: OAuthResult | OAuthError): void {
    if (!target || target.closed) {
      console.error('Cannot post message: target window is closed or invalid');
      return;
    }

    const message = {
      type: 'oauth_response',
      ...result
    };

    // Post to allowed origin only
    const targetOrigin = Array.from(this.allowedOrigins)[0] || window.location.origin;
    target.postMessage(message, targetOrigin);
  }
}

export const oauthMessageHandler = OAuthMessageHandler.getInstance();