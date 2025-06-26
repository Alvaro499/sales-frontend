// Crea instancias de API configuradas para los servicios de ventas y autenticación
import { createApiInstance } from './http.service';
import { createApiMethods } from './http.service';

export const ventasApi = createApiMethods(createApiInstance('http://localhost:8082'));
export const authApi = createApiMethods(createApiInstance('http://localhost:8083'));
