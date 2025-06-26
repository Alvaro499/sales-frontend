// Tipos para las respuestas de la API
export interface ApiSuccessResponse<T> {
	status: number;
	data: T;
	message?: string;
	timestamp?: string;
}

export interface ApiErrorResponse {
	status: number;
	message: string;
	errorCode?: string;
	details?: string[];
	path?: string;
	timestamp?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Tipo para errores de API extendido
export interface ApiError extends Error {
	response?: ApiErrorResponse;
	status?: number;
}
