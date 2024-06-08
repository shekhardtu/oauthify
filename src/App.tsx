import React from 'react';

import './App.css';
import Board from './app/Board/index.page';
import OAuthRedirect from './app/OAuthRedirect/index.page';

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
    case '/board':
      ComponentToRender = <Board />;
      break;
    case '/oauth-redirect':
      ComponentToRender = <OAuthRedirect />;
      break;
    default:
      ComponentToRender = <Board />;
      break;
  }

  return <>{ComponentToRender}</>;
}

export default App;
