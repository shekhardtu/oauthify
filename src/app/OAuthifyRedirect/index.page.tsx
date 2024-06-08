import React, { useEffect } from 'react';

const OAuthifyRedirect: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');
    let provider = '';
    if (state) {
      const decodedState = JSON.parse(decodeURIComponent(state));
      provider = decodedState.provider;
      // Now you have the provider
    }

    if (code) {
      window.opener.postMessage(
        { code, state, provider },
        window.location.origin,
      );
    } else if (error) {
      window.opener.postMessage(
        { error, state, provider },
        window.location.origin,
      );
    }
    window.close();
  }, []);
  return <div>Redirecting...</div>;
};

export default OAuthifyRedirect;
