import { ErrorResponse, OkResponse } from '../../models/Api.models';

// Type guard para detectar si la respuesta es un error
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return 'message' in response && 'code' in response;
};

// Type guard para detectar si la respuesta es exitosa
export const isOkResponse = (response: any): response is OkResponse => {
  return 'status' in response;
};
