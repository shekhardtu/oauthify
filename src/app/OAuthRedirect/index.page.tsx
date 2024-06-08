import React, { useEffect } from 'react';

const OAuthRedirect: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');

    if (code) {
      window.opener.postMessage({ code }, window.location.origin);
    } else if (error) {
      window.opener.postMessage({ error }, window.location.origin);
    }

    window.close();
  }, []);

  return <div>Redirecting...</div>;
};

export default OAuthRedirect;
