// src/services/clients.service.ts

import { createApiInstance, createApiMethods } from './http.service';

// Clientes de API para cada microservicio
export const ventasApi = createApiMethods(createApiInstance('http://localhost:8082'));
export const authApi = createApiMethods(createApiInstance('http://localhost:8083'));
export const recommendationApi = createApiMethods(createApiInstance('http://localhost:8081'));
