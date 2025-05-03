import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

// API Real URL
const apiInstance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8080', // Cambiar al backend real cuando sea necesario
});

// ----------------------------------- INTERCEPTORS ------------------------------------

// Interceptor para agregar el token antes de la solicitud (descomentarlo cuando sea necesario)
apiInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// const token = getSessionToken();
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	error => Promise.reject(error),
);

// Interceptor para manejar la respuesta (manejo de errores, token expirado, etc.)
apiInstance.interceptors.response.use(
	response => response,
	async error => {
		if (
			error.response?.status === 401 &&
			error.response?.data?.code === 40103
		) {
			// Manejar sesión expirada (ej. removeSessionToken())
		}
		return Promise.reject(error);
	},
);

// ----------------------------------- MÉTODOS AXIOS -----------------------------------

// Método POST genérico
export const doPost = async <I, R>(payload: I, path: string): Promise<R> => {
	const response: AxiosResponse<R, I> = await apiInstance.post(path, payload);
	return response.data;
};

// Método PUT genérico
export const doPut = async <I, R>(payload: I, path: string): Promise<R> => {
	const response: AxiosResponse<R, I> = await apiInstance.put(path, payload);
	return response.data;
};

// Método GET genérico
export const doGet = async <R>(path: string): Promise<R> => {
	const response: AxiosResponse<R> = await apiInstance.get(path);
	return response.data;
};
