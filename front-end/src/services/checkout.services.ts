import { ventasApi } from './clients.service'; 

import { ErrorResponse, OkResponse } from '../models/Api.models'; 
import { CreateOrderRequest} from '../models/Order.models';

const BASE_PATH = 'api/orders'; 


export const createOrder = async (order: CreateOrderRequest): Promise<OkResponse | ErrorResponse> => {
  try {   
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
