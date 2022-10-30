import { createContext } from 'react';

import type { AuthContextValues } from './types';

export const AuthContext = createContext<AuthContextValues | null>(null);

export const AppRootElContext = createContext<HTMLElement | null>(null);
