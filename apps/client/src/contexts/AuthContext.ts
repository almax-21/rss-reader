import { createContext } from 'react';

interface AuthContextValues {
	refetchAuthQuery: () => void;
}

export const AuthContext = createContext<AuthContextValues | null>(null);
