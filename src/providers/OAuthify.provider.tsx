import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OAuthifyContextProps {
    children?: ReactNode;
    setOnSuccess?: (response) => void;
    setOnFailure?: (erorr) => void;
    onSuccess?: () => void;
    onFailure?: () => void;
    setLoading?: (loading: boolean) => void;
    loading?: boolean;

}

const OAuthifyContext = createContext<OAuthifyContextProps | undefined>(undefined);




export const OAuthifyProvider: React.FC<OAuthifyContextProps> = ({
    children,

}) => {

    const [onSuccess, setOnSuccess] = useState<any>();
    const [onFailure, setOnFailure] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);



    return (
        <OAuthifyContext.Provider value={{

            setOnSuccess,
            setOnFailure,
            onSuccess,
            onFailure,
            setLoading,
            loading
        }}>
            {children}
        </OAuthifyContext.Provider>
    );
};

export const useOAuthify = () => {
    const context = useContext(OAuthifyContext);
    if (!context) {
        throw new Error('useOAuthify must be used within aOAuthifyProvider');
    }
    return context;
};
