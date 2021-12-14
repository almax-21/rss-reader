import { createContext } from 'react';

interface AuthContextValues {
	refetchAuthQuery: () => void;
}

const AuthContext = createContext<AuthContextValues | null>(null);

export default AuthContext;
