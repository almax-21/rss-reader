import type { RootState } from '../types';

export const selectUser = (state: RootState) => state.user;

export const selectAuthState = (state: RootState) => state.user.isAuth;

export const selectUserData = (state: RootState) => state.user.userData;
