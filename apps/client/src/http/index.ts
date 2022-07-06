import axios from 'axios';

import { API_ORIGIN, FEEDS_URL,TOKEN_KEY } from '@/types/constants';

const $api = axios.create({
	baseURL: API_ORIGIN,
});

$api.interceptors.request.use((config) => {
	if (config.headers && config.url !== FEEDS_URL) {
    const token = localStorage.getItem(TOKEN_KEY);
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default $api;
