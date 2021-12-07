import { RootState } from '../types';

export const selectUserData = (state: RootState) => state.user.userData;

export const selectAuthState = (state: RootState) => state.user.isAuth;
