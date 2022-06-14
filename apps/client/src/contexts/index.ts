import { createContext } from 'react';

import { AuthContextValues } from './types';

export const AuthContext = createContext<AuthContextValues | null>(null);
