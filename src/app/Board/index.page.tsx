import React from "react";
import BoardPage from "./Board.page";
import { ReactOAuthProvider } from "src/context/ReactOauth.context";

const Board: React.FC = () => {

    const clientId = '67142922307-7bf4kqhr91usqhosrku0t50ugk4abai1.apps.googleusercontent.com';

    return (
        <ReactOAuthProvider
            googleClientId={clientId}
        >
            <BoardPage />
        </ReactOAuthProvider>
    );
};

export default Board;
