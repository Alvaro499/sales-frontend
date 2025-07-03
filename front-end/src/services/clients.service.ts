// src/services/clients.service.ts

import { createApiInstance, createApiMethods } from './http.service';



// Clientes de API para cada microservicio
export const ventasApi = createApiMethods(createApiInstance('http://localhost:8004'));
export const authApi = createApiMethods(createApiInstance('http://localhost:8001'));
export const recommendationApi = createApiMethods(createApiInstance('http://localhost:8003'));
