// checkout.services.ts
import { ventasApi } from './clients.service'; // Suponiendo que tienes un cliente API configurado

import { ErrorResponse, OkResponse } from '../models/Api.models'; // Modelos para respuesta de éxito o error
import { CreateOrderRequest} from '../models/Order.models';

const BASE_PATH = 'api/orders'; // Ruta base para órdenes

// Función para crear una nueva orden de compra
export const createOrder = async (order: CreateOrderRequest): Promise<OkResponse | ErrorResponse> => {
  try {   
    // Enviar solicitud POST para crear una orden
    const response = await ventasApi.doPost<CreateOrderRequest, OkResponse>(order, BASE_PATH);
    return response;
  } catch (error) {
    return {
      message: 'Error al crear la orden',
      code: 500,
      params: 'CREATE_ORDER_ERROR',
    };
  }
};

// Función para obtener los métodos de pago disponibles
/*export const getPaymentMethods = async (): Promise<PaymentMethod[] | ErrorResponse> => {
  try {
    const response = await ventasApi.doGet<PaymentMethod[]>(`${BASE_PATH}/payment-methods`);
    return response;
  } catch (error) {
    return {
      message: 'Error al obtener los métodos de pago',
      code: 500,
      params: 'PAYMENT_METHODS_ERROR',
    };
  }
};

// Función para obtener los métodos de envío disponibles
export const getShippingMethods = async (): Promise<ShippingMethod[] | ErrorResponse> => {
  try {
    const response = await ventasApi.doGet<ShippingMethod[]>(`${BASE_PATH}/shipping-methods`);
    return response;
  } catch (error) {
    return {
      message: 'Error al obtener los métodos de envío',
      code: 500,
      params: 'SHIPPING_METHODS_ERROR',
    };
  }
};*/
