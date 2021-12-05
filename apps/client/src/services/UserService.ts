import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUser } from '../models/IUser';
import { UserData } from '../types';

const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://rss-reader-backend.herokuapp.com/' }),
	endpoints: (build) => ({
		createUser: build.mutation<IUser, UserData>({
			query: (userData) => ({
				url: '/api/user/registration',
				method: 'POST',
				body: userData,
			}),
		}),
		loginUser: build.mutation<IUser, UserData>({
			query: (userData) => ({
				url: '/api/user/login',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;

					localStorage.setItem('token', data.token);
				} catch (err) {
					console.error(err);
				}
			},
		}),
		authUser: build.query<IUser, string | null>({
			query: (token) => ({
				url: '/api/user/auth',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (err) {
					localStorage.removeItem('token');
				}
			},
		}),
	}),
});

export default userAPI;
