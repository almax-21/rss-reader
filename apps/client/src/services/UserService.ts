import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LocaleType, MESSAGES } from '../i18n/types';
import { IUser } from '../models/IUser';
import {
	notificationReqFailure,
	notificationReqPending,
	notificationReqSuccess,
} from '../store/slices/notificationSlice';
import { SignInUserData, SignUpUserData, TokenData } from '../types';
import { API_ORIGIN, TOKEN_KEY } from '../types/constants';

const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_ORIGIN}/user`,
	}),
	endpoints: (build) => ({
		createUser: build.mutation<IUser, SignUpUserData>({
			query: (userData) => ({
				url: '/registration',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					dispatch(notificationReqPending());

					await queryFulfilled;

					dispatch(
						notificationReqSuccess(MESSAGES.REGISTRATION_SUCCESSFULLY_COMPLETED)
					);
				} catch (e) {
					const errorData = e as any;

					if ('error' in errorData) {
						const statusCode = errorData.error.status;

						if (statusCode === 'FETCH_ERROR') {
							const errorMessage = navigator.onLine
								? MESSAGES.ERROR_UNKNOWN
								: MESSAGES.ERROR_NETWORK;
							dispatch(notificationReqFailure(errorMessage));
						}
					} else {
						dispatch(notificationReqFailure(MESSAGES.ERROR_UNKNOWN));
					}
				}
			},
		}),
		loginUser: build.mutation<TokenData, SignInUserData>({
			query: (userData) => ({
				url: '/login',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				try {
					dispatch(notificationReqPending());

					const { data } = await queryFulfilled;

					localStorage.setItem(TOKEN_KEY, data.token);
				} catch (e) {
					const errorData = e as any;

					if ('error' in errorData) {
						const statusCode = errorData.error.status;

						if (statusCode === 'FETCH_ERROR') {
							const errorMessage = navigator.onLine
								? MESSAGES.ERROR_UNKNOWN
								: MESSAGES.ERROR_NETWORK;
							dispatch(notificationReqFailure(errorMessage));
						}
					} else {
						dispatch(notificationReqFailure(MESSAGES.ERROR_UNKNOWN));
					}
				}
			},
		}),
		authUser: build.query<IUser, void>({
			query: () => {
				const token = localStorage.getItem(TOKEN_KEY);

				return {
					url: '/auth',
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
		}),
		switchLang: build.mutation<string, LocaleType>({
			query: (lang) => {
				const token = localStorage.getItem(TOKEN_KEY);

				return {
					url: '/lang',
					method: 'PUT',
					body: { lang },
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
		}),
	}),
});

export default userAPI;
