import React, { ReactNode, useState, ErrorInfo, useCallback } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback((error: Error, errorInfo: ErrorInfo) => {
        console.error('Error caught in ErrorBoundary:', error, errorInfo);
        setHasError(true);
    }, []);

    if (hasError) {
        return <h1>Something went wrong.</h1>;
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

export default ErrorBoundary;
