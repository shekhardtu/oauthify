import React from 'react';
import BoardPage from './Board.page';
import { OAuthifyProvider } from 'src/providers/OAuthify.provider';

const Demo: React.FC = () => {
  return (
    <OAuthifyProvider>
      <BoardPage />
    </OAuthifyProvider>
  );
};

export default Demo;
