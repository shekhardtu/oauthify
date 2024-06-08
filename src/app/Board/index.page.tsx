import React from 'react';
import BoardPage from './Board.page';
import { OAuthifyProvider } from 'src/providers/OAuthify.provider';

const Board: React.FC = () => {
  return (
    <OAuthifyProvider>
      <BoardPage />
    </OAuthifyProvider>
  );
};

export default Board;
