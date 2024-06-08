import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReactOAuthContextProps {
    children?: ReactNode;
    googleClientId?: string;

    githubClientId?: string;
    setOnSuccess?: (response) => void;
    setOnFailure?: (erorr) => void;
    onSuccess?: () => void;
    onFailure?: () => void;
    setLoading?: (loading: boolean) => void;
    loading?: boolean;

}

const ReactOAuthContext = createContext<ReactOAuthContextProps | undefined>(undefined);




export const ReactOAuthProvider: React.FC<ReactOAuthContextProps> = ({
    children,
    googleClientId,
    githubClientId,
}) => {

    const [onSuccess, setOnSuccess] = useState<any>();
    const [onFailure, setOnFailure] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);



    return (
        <ReactOAuthContext.Provider value={{
            googleClientId,
            githubClientId,
            setOnSuccess,
            setOnFailure,
            onSuccess,
            onFailure,
            setLoading,
            loading
        }}>
            {children}
        </ReactOAuthContext.Provider>
    );
};

export const useReactOAuth = () => {
    const context = useContext(ReactOAuthContext);
    if (!context) {
        throw new Error('useReactOAuth must be used within a ReactOAuthProvider');
    }
    return context;
};
