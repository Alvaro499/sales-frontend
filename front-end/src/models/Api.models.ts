export interface ErrorResponse {
	message: string; // Mensaje de error
	code: number;    // Código de error
	params?: string; // Parámetros opcionales
}

export type OkResponse = {
	status: string; // Estado de respuesta
};

export type Response = {
	result: string; // Resultado devuelto
};
