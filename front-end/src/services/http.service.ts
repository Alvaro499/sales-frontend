import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthStorage } from '../hooks/useLocalStorage';

// ----------------------------- API FACTORY -----------------------------

export const createApiInstance = (baseURL: string): AxiosInstance => {
	const instance = axios.create({ baseURL });

	// Interceptor de request (agrega token si existe)
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = AuthStorage.getToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		error => Promise.reject(error)
	);

	// Interceptor de response (manejo de errores como token expirado)
	instance.interceptors.response.use(
		response => response,
		error => {
			if (error.response?.status === 401 && error.response?.data?.code === 40103) {
				AuthStorage.clearToken();
				// window.location.href = '/login'; // opcional
			}
			return Promise.reject(error);
		}
	);

	return instance;
};

// Métodos genéricos ligados a una instancia
export const createApiMethods = (instance: AxiosInstance) => {
	return {
		doGet: async <R>(path: string): Promise<R> => {
			const response: AxiosResponse<R> = await instance.get(path);
			return response.data;
		},

		doPost: async <I, R>(payload: I, path: string): Promise<R> => {
			const response: AxiosResponse<R> = await instance.post(path, payload);
			return response.data;
		},

		doPut: async <I, R>(payload: I, path: string): Promise<R> => {
			const response: AxiosResponse<R> = await instance.put(path, payload);
			return response.data;
		}
	};
};
