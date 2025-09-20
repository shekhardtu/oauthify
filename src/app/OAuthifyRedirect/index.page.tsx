import React, { useEffect } from 'react';
import { handleOAuthCallback } from '../../OAuthify.core';

const OAuthifyRedirect: React.FC = () => {
  useEffect(() => {
    try {
      // Use the centralized callback handler
      handleOAuthCallback();

      // Close window after a short delay to ensure message is sent
      setTimeout(() => {
        if (window.opener) {
          window.close();
        }
      }, 100);
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      // Still try to close the window even if there's an error
      setTimeout(() => {
        if (window.opener) {
          window.close();
        }
      }, 1000);
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Processing authentication...</h2>
        <p>This window will close automatically.</p>
      </div>
    </div>
  );
};

export default OAuthifyRedirect;
