import { ErrorResponse, OkResponse } from '../../models/Api.models';// Type guards explícitos
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return 'message' in response && 'code' in response;
};

export const isOkResponse = (response: any): response is OkResponse => {
  return 'status' in response;
};