import React from 'react';

import './App.css';
import Demo from './app/Demo/index.page';
import OAuthifyRedirect from './app/OAuthifyRedirect/index.page';

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  let ComponentToRender: React.ReactNode = <></>;

  switch (route) {
    case '/demo':
      ComponentToRender = <Demo />;
      break;
    case '/oauthify-redirect':
      ComponentToRender = <OAuthifyRedirect />;
      break;
    default:
      ComponentToRender = <Demo />;
      break;
  }

  return <>{ComponentToRender}</>;
}

export default App;
