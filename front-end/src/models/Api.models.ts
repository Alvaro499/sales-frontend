export interface ErrorResponse {
	message: string;
	code: number;
	errorCode?: string;
}
export type OkResponse = {
	status: string;
};

export type Response = {
	result: string;
};
