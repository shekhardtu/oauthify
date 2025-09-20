import React, { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';
import { OAuthError, OAuthResponse } from '../types/oauthify.types';

// State types
interface OAuthifyState {
  loading: boolean;
  success: OAuthResponse | null;
  error: OAuthError | null;
  activeProvider: string | null;
}

// Action types
type OAuthifyAction =
  | { type: 'SET_LOADING'; payload: { loading: boolean; provider?: string } }
  | { type: 'SET_SUCCESS'; payload: OAuthResponse }
  | { type: 'SET_ERROR'; payload: OAuthError }
  | { type: 'CLEAR_STATE' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: OAuthifyState = {
  loading: false,
  success: null,
  error: null,
  activeProvider: null
};

// Reducer function
function oauthifyReducer(state: OAuthifyState, action: OAuthifyAction): OAuthifyState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
        activeProvider: action.payload.provider || state.activeProvider,
        error: null
      };

    case 'SET_SUCCESS':
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null,
        activeProvider: null
      };

    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        activeProvider: null
      };

    case 'CLEAR_STATE':
      return initialState;

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}

// Context interface
interface OAuthifyContextProps {
  state: OAuthifyState;
  setOnSuccess: (response: OAuthResponse) => void;
  setOnFailure: (error: OAuthError) => void;
  setLoading: (loading: boolean, provider?: string) => void;
  clearState: () => void;
  clearError: () => void;
}

// Create context
const OAuthifyContext = createContext<OAuthifyContextProps | undefined>(undefined);

// Provider component
export interface OAuthifyProviderProps {
  children: ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onError?: (error: OAuthError) => void;
}

export const OAuthifyProvider: React.FC<OAuthifyProviderProps> = ({
  children,
  onSuccess,
  onError
}) => {
  const [state, dispatch] = useReducer(oauthifyReducer, initialState);

  const setOnSuccess = useCallback((response: OAuthResponse) => {
    dispatch({ type: 'SET_SUCCESS', payload: response });
    onSuccess?.(response);
  }, [onSuccess]);

  const setOnFailure = useCallback((error: OAuthError) => {
    dispatch({ type: 'SET_ERROR', payload: error });
    onError?.(error);
  }, [onError]);

  const setLoading = useCallback((loading: boolean, provider?: string) => {
    dispatch({ type: 'SET_LOADING', payload: { loading, provider } });
  }, []);

  const clearState = useCallback(() => {
    dispatch({ type: 'CLEAR_STATE' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state,
    setOnSuccess,
    setOnFailure,
    setLoading,
    clearState,
    clearError
  }), [state, setOnSuccess, setOnFailure, setLoading, clearState, clearError]);

  return (
    <OAuthifyContext.Provider value={contextValue}>
      {children}
    </OAuthifyContext.Provider>
  );
};

// Custom hook
export const useOAuthify = () => {
  const context = useContext(OAuthifyContext);
  if (!context) {
    throw new Error('useOAuthify must be used within an OAuthifyProvider');
  }
  return context;
};

// Selector hooks for specific state values
export const useOAuthifyLoading = () => {
  const { state } = useOAuthify();
  return state.loading;
};

export const useOAuthifySuccess = () => {
  const { state } = useOAuthify();
  return state.success;
};

export const useOAuthifyError = () => {
  const { state } = useOAuthify();
  return state.error;
};