import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// ----------------------------- TOKEN UTILS -----------------------------

export const setSessionToken = (token: string) => {
	localStorage.setItem('jwtToken', token);
};

export const getSessionToken = (): string | null => {
	return localStorage.getItem('jwtToken');
};

export const removeSessionToken = () => {
	localStorage.removeItem('jwtToken');
};

// ----------------------------- AXIOS INSTANCE -----------------------------

const apiInstance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8083', // Cambiar al backend real cuando sea necesario
});

// ----------------------------- INTERCEPTORS -----------------------------

// Interceptor para agregar el token automáticamente a cada request
apiInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getSessionToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta (ej. token expirado)
apiInstance.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401 && error.response?.data?.code === 40103) {
			removeSessionToken();
			// window.location.href = '/login'; // Si se desea redirigir al login
		}
		return Promise.reject(error);
	}
);

// ----------------------------- MÉTODOS GENÉRICOS -----------------------------

export const doGet = async <R>(path: string): Promise<R> => {
	const response: AxiosResponse<R> = await apiInstance.get(path);
	return response.data;
};

export const doPost = async <I, R>(payload: I, path: string): Promise<R> => {
	const response: AxiosResponse<R, I> = await apiInstance.post(path, payload);
	return response.data;
};

export const doPut = async <I, R>(payload: I, path: string): Promise<R> => {
	const response: AxiosResponse<R, I> = await apiInstance.put(path, payload);
	return response.data;
};

// ------------------------ MÉTODOS CON CONTROL DE TOKEN ------------------------

export const doAuthGet = async <R>(path: string, useToken: boolean = true): Promise<R> => {
	const headers = useToken && getSessionToken()
		? { Authorization: `Bearer ${getSessionToken()}` }
		: {};

	const response: AxiosResponse<R> = await axios.get(`${apiInstance.defaults.baseURL}${path}`, { headers });
	return response.data;
};

export const doAuthPost = async <I, R>(payload: I, path: string, useToken: boolean = true): Promise<R> => {
	const headers = useToken && getSessionToken()
		? { Authorization: `Bearer ${getSessionToken()}` }
		: {};

	const response: AxiosResponse<R, I> = await axios.post(`${apiInstance.defaults.baseURL}${path}`, payload, { headers });
	return response.data;
};

export const doAuthPut = async <I, R>(payload: I, path: string, useToken: boolean = true): Promise<R> => {
	const headers = useToken && getSessionToken()
		? { Authorization: `Bearer ${getSessionToken()}` }
		: {};

	const response: AxiosResponse<R, I> = await axios.put(`${apiInstance.defaults.baseURL}${path}`, payload, { headers });
	return response.data;
};
