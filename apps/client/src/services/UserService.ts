import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { LocaleType } from '@/i18n/types';
import { MESSAGES } from '@/i18n/types';
import type { User } from '@/models/User';
import {
	notificationReqFailure,
	notificationReqPending,
	notificationReqSuccess,
} from '@/store/slices/notificationSlice';
import type { SignInUserData, SignUpUserData, TokenData } from '@/types';
import { API_ORIGIN, TOKEN_KEY } from '@/types/constants';

const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_ORIGIN}/user`,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(TOKEN_KEY);
			headers.set('Authorization', `Bearer ${token}`);

			return headers;
		},
	}),
	endpoints: (build) => ({
		createUser: build.mutation<User, SignUpUserData>({
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
						notificationReqSuccess(
							MESSAGES.REGISTRATION_SUCCESSFULLY_COMPLETED,
						),
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
		authUser: build.query<User, void>({
			query: () => ({
				url: '/auth',
				method: 'GET',
			}),
		}),
		switchLang: build.mutation<LocaleType, LocaleType>({
			query: (lang) => ({
				url: '/lang',
				method: 'PUT',
				body: { lang },
			}),
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				try {
					dispatch(notificationReqPending());

					await queryFulfilled;
				} catch (e) {
					navigator.onLine
						? dispatch(notificationReqFailure(MESSAGES.ERROR_UNKNOWN))
						: dispatch(notificationReqFailure(MESSAGES.ERROR_NETWORK));
				}
			},
		}),
	}),
});

export default userAPI;
